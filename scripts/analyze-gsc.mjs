#!/usr/bin/env node
/**
 * Parse Google Search Console CSV exports and write data/gsc/latest-report.md
 *
 * Usage: node scripts/analyze-gsc.mjs [directory]
 * Default directory: data/gsc
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const GSC_DIR = process.argv[2] ?? join(process.cwd(), 'data', 'gsc');
const REPORT_PATH = join(GSC_DIR, 'latest-report.md');
const SITE_HOST = 'silverhealthdaily.com';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || (c === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
      if (c === '\r') i++;
    } else if (c !== '\r') {
      field += c;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }

  return rows;
}

function normalizeHeader(h) {
  return h.trim().toLowerCase().replace(/\s+/g, ' ');
}

const HEADER_ALIASES = {
  key: [
    'top queries',
    'query',
    'queries',
    'suchanfrage',
    'beliebteste suchanfragen',
    'top pages',
    'page',
    'pages',
    'url',
    'beliebteste seiten',
    'seite',
  ],
  clicks: ['clicks', 'klicks'],
  impressions: ['impressions', 'impressionen', 'impression'],
  ctr: ['ctr'],
  position: ['position', 'avg. position', 'average position', 'durchschnittliche position'],
  date: ['date', 'datum'],
};

function detectColumnMap(headers) {
  const normalized = headers.map(normalizeHeader);
  const map = {};

  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    const idx = normalized.findIndex((h) => aliases.includes(h));
    if (idx >= 0) map[field] = idx;
  }

  return map;
}

function parseNumber(value) {
  if (value == null || value === '') return 0;
  const cleaned = String(value).replace(/%/g, '').replace(/,/g, '').trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function parseCtr(value) {
  if (value == null || value === '') return 0;
  const s = String(value).trim();
  if (s.endsWith('%')) return parseNumber(s) / 100;
  const n = parseNumber(s);
  return n > 1 ? n / 100 : n;
}

function parseGscFile(filePath) {
  const raw = readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const rows = parseCsv(raw);
  if (rows.length < 2) return { type: 'unknown', rows: [], filePath };

  const headers = rows[0];
  const map = detectColumnMap(headers);
  if (map.clicks == null || map.impressions == null) {
    return { type: 'unknown', rows: [], filePath, error: 'Missing Clicks or Impressions columns' };
  }

  const firstHeader = normalizeHeader(headers[map.key ?? 0] ?? '');
  const isPages =
    firstHeader.includes('page') ||
    firstHeader.includes('url') ||
    firstHeader.includes('seite') ||
    basename(filePath).includes('pages');

  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const key = map.key != null ? row[map.key]?.trim() : row[0]?.trim();
    if (!key) continue;

    const item = {
      key,
      clicks: parseNumber(row[map.clicks]),
      impressions: parseNumber(row[map.impressions]),
      ctr: map.ctr != null ? parseCtr(row[map.ctr]) : 0,
      position: map.position != null ? parseNumber(row[map.position]) : 0,
    };

    if (!item.ctr && item.impressions > 0) item.ctr = item.clicks / item.impressions;
    data.push(item);
  }

  return { type: isPages ? 'pages' : 'queries', rows: data, filePath };
}

function sumMetrics(rows) {
  return rows.reduce(
    (acc, r) => {
      acc.clicks += r.clicks;
      acc.impressions += r.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0 },
  );
}

function weightedAvgPosition(rows) {
  let weighted = 0;
  let total = 0;
  for (const r of rows) {
    if (r.impressions > 0 && r.position > 0) {
      weighted += r.position * r.impressions;
      total += r.impressions;
    }
  }
  return total ? weighted / total : 0;
}

function pct(n) {
  return `${(n * 100).toFixed(2)}%`;
}

function num(n, digits = 1) {
  return Number(n).toFixed(digits);
}

function extractDateFromFilename(name) {
  const m = name.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function sortByImpressions(rows) {
  return [...rows].sort((a, b) => b.impressions - a.impressions);
}

function sitePath(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (!u.hostname.includes(SITE_HOST.replace('www.', ''))) return url;
    return u.pathname.replace(/\/$/, '') || '/';
  } catch {
    return url;
  }
}

function mapQueryToSitePath(query) {
  const q = query.toLowerCase();
  const rules = [
    [/walk.*calor|calor.*walk/, '/tools/walking-calorie-calculator'],
    [/body fat|fat percent/, '/tools/body-fat-calculator'],
    [/bmi|body mass/, '/tools/bmi-calculator'],
    [/protein/, '/tools/protein-calculator'],
    [/macro/, '/tools/macro-calculator'],
    [/calorie deficit|deficit/, '/tools/calorie-deficit-calculator'],
    [/daily calorie|tdee|calories per day/, '/tools/daily-calorie-calculator'],
    [/water intake|hydration|how much water/, '/tools/water-intake-calculator'],
    [/step.*day|steps per day/, '/tools/step-goal-calculator'],
    [/blood pressure/, '/articles/normal-blood-pressure-by-age'],
    [/sleep.*50|sleep.*older|how much sleep/, '/articles/how-much-sleep-adults-over-50-need'],
    [/weight loss.*50|lose weight.*50/, '/articles/how-to-lose-weight-after-50'],
  ];
  for (const [re, path] of rules) {
    if (re.test(q)) return path;
  }
  return null;
}

function recommendAction(item, kind) {
  const { impressions, ctr, position, key } = item;
  const ctrPct = ctr * 100;

  if (kind === 'query') {
    const target = mapQueryToSitePath(key);
    if (position >= 11 && position <= 30 && impressions >= 5) {
      return target
        ? `Striking distance (pos ${num(position)}): improve ${target} title/meta + internal links for "${key}"`
        : `Striking distance (pos ${num(position)}): consider new or updated content for "${key}"`;
    }
    if (impressions >= 20 && ctrPct < 2) {
      return target
        ? `Low CTR (${pct(ctr)}): rewrite title + meta description on ${target} for "${key}"`
        : `Low CTR (${pct(ctr)}): add content targeting "${key}"`;
    }
    if (impressions >= 50 && position > 30) {
      return `High impressions but deep rank (pos ${num(position)}): needs stronger page + backlinks for "${key}"`;
    }
  }

  if (kind === 'page') {
    const path = sitePath(key);
    if (impressions >= 20 && ctrPct < 2) {
      return `Low CTR page: refresh title + meta on ${path} (${impressions} imp, ${pct(ctr)} CTR)`;
    }
    if (impressions >= 10 && position >= 15 && position <= 40) {
      return `Page in striking distance: add internal links pointing to ${path}`;
    }
  }

  return null;
}

function compareQueries(current, previous) {
  const prevMap = new Map(previous.rows.map((r) => [r.key.toLowerCase(), r]));
  const deltas = [];

  for (const row of current.rows) {
    const prev = prevMap.get(row.key.toLowerCase());
    if (!prev) continue;
    deltas.push({
      key: row.key,
      impressionDelta: row.impressions - prev.impressions,
      clickDelta: row.clicks - prev.clicks,
      positionDelta: row.position - prev.position,
    });
  }

  return deltas
    .filter((d) => Math.abs(d.impressionDelta) >= 5 || Math.abs(d.clickDelta) >= 1)
    .sort((a, b) => b.impressionDelta - a.impressionDelta);
}

function formatTable(headers, rows) {
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
  ];
  for (const row of rows) {
    lines.push(`| ${row.join(' | ')} |`);
  }
  return lines.join('\n');
}

function loadCsvFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.csv') && !f.startsWith('sample-'))
    .map((f) => {
      const full = join(dir, f);
      const date = extractDateFromFilename(f) ?? statSync(full).mtime.toISOString().slice(0, 10);
      return { name: f, path: full, date, mtime: statSync(full).mtimeMs, data: parseGscFile(full) };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.mtime - a.mtime);
}

function buildReport(parsed) {
  const lines = [];
  const now = new Date().toISOString().slice(0, 10);

  lines.push('# GSC Analysis Report', '', `Generated: ${now}`, '');

  const queryFiles = parsed.filter((f) => f.data.type === 'queries');
  const pageFiles = parsed.filter((f) => f.data.type === 'pages');

  if (!queryFiles.length && !pageFiles.length) {
    lines.push(
      '## No data yet',
      '',
      'Export CSV files from Google Search Console into `data/gsc/`.',
      'See `data/gsc/EXPORT.txt` for step-by-step instructions.',
      '',
      'Expected filenames:',
      '- `YYYY-MM-DD-queries.csv`',
      '- `YYYY-MM-DD-pages.csv` (optional)',
    );
    return lines.join('\n');
  }

  const latestQueries = queryFiles[0]?.data;
  const prevQueries = queryFiles[1]?.data;
  const latestPages = pageFiles[0]?.data;

  if (latestQueries?.rows.length) {
    const totals = sumMetrics(latestQueries.rows);
    const avgCtr = totals.impressions ? totals.clicks / totals.impressions : 0;

    lines.push(
      '## Snapshot (queries)',
      '',
      `- **File:** \`${basename(queryFiles[0].path)}\` (${queryFiles[0].date})`,
      `- **Total clicks:** ${totals.clicks}`,
      `- **Total impressions:** ${totals.impressions}`,
      `- **Avg CTR:** ${pct(avgCtr)}`,
      `- **Weighted avg position:** ${num(weightedAvgPosition(latestQueries.rows))}`,
      `- **Unique queries:** ${latestQueries.rows.length}`,
      '',
    );

    const topQueries = sortByImpressions(latestQueries.rows).slice(0, 15);
    lines.push('## Top queries by impressions', '');
    lines.push(
      formatTable(
        ['Query', 'Clicks', 'Impressions', 'CTR', 'Position'],
        topQueries.map((r) => [
          r.key.replace(/\|/g, '\\|'),
          String(r.clicks),
          String(r.impressions),
          pct(r.ctr),
          num(r.position),
        ]),
      ),
      '',
    );

    const opportunities = sortByImpressions(latestQueries.rows)
      .filter((r) => r.impressions >= 10 && (r.ctr < 0.02 || (r.position >= 11 && r.position <= 30)))
      .slice(0, 12);

    if (opportunities.length) {
      lines.push('## Query opportunities', '', '_High impressions with low CTR, or position 11-30._', '');
      lines.push(
        formatTable(
          ['Query', 'Impressions', 'CTR', 'Position', 'Suggested action'],
          opportunities.map((r) => [
            r.key.replace(/\|/g, '\\|'),
            String(r.impressions),
            pct(r.ctr),
            num(r.position),
            recommendAction(r, 'query') ?? 'Monitor',
          ]),
        ),
        '',
      );
    }

    if (prevQueries?.rows.length) {
      const deltas = compareQueries(latestQueries, prevQueries);
      const gainers = deltas.filter((d) => d.impressionDelta > 0).slice(0, 8);
      const losers = deltas.filter((d) => d.impressionDelta < 0).slice(0, 8);

      lines.push('## Week-over-week (queries)', '');
      lines.push(`Comparing \`${basename(queryFiles[0].path)}\` vs \`${basename(queryFiles[1].path)}\``, '');

      if (gainers.length) {
        lines.push('### Impression gainers', '');
        lines.push(
          formatTable(
            ['Query', 'Imp change', 'Clicks change', 'Pos change'],
            gainers.map((d) => [
              d.key.replace(/\|/g, '\\|'),
              `+${d.impressionDelta}`,
              d.clickDelta >= 0 ? `+${d.clickDelta}` : String(d.clickDelta),
              d.positionDelta >= 0 ? `+${num(d.positionDelta)}` : num(d.positionDelta),
            ]),
          ),
          '',
        );
      }

      if (losers.length) {
        lines.push('### Impression losers', '');
        lines.push(
          formatTable(
            ['Query', 'Imp change', 'Clicks change', 'Pos change'],
            losers.map((d) => [
              d.key.replace(/\|/g, '\\|'),
              String(d.impressionDelta),
              d.clickDelta >= 0 ? `+${d.clickDelta}` : String(d.clickDelta),
              d.positionDelta >= 0 ? `+${num(d.positionDelta)}` : num(d.positionDelta),
            ]),
          ),
          '',
        );
      }
    }
  }

  if (latestPages?.rows.length) {
    const totals = sumMetrics(latestPages.rows);
    const avgCtr = totals.impressions ? totals.clicks / totals.impressions : 0;

    lines.push(
      '## Snapshot (pages)',
      '',
      `- **File:** \`${basename(pageFiles[0].path)}\` (${pageFiles[0].date})`,
      `- **Total clicks:** ${totals.clicks}`,
      `- **Total impressions:** ${totals.impressions}`,
      `- **Avg CTR:** ${pct(avgCtr)}`,
      `- **Weighted avg position:** ${num(weightedAvgPosition(latestPages.rows))}`,
      '',
    );

    const topPages = sortByImpressions(latestPages.rows).slice(0, 12);
    lines.push('## Top pages by impressions', '');
    lines.push(
      formatTable(
        ['Page', 'Clicks', 'Impressions', 'CTR', 'Position'],
        topPages.map((r) => [
          sitePath(r.key).replace(/\|/g, '\\|'),
          String(r.clicks),
          String(r.impressions),
          pct(r.ctr),
          num(r.position),
        ]),
      ),
      '',
    );

    const pageOpps = sortByImpressions(latestPages.rows)
      .map((r) => ({ action: recommendAction(r, 'page') }))
      .filter((r) => r.action)
      .slice(0, 8);

    if (pageOpps.length) {
      lines.push('## Page opportunities', '');
      for (const r of pageOpps) lines.push(`- ${r.action}`);
      lines.push('');
    }
  }

  const actions = [];
  if (latestQueries?.rows.length) {
    for (const r of sortByImpressions(latestQueries.rows)) {
      const a = recommendAction(r, 'query');
      if (a) actions.push({ priority: r.impressions, text: a });
    }
  }
  if (latestPages?.rows.length) {
    for (const r of sortByImpressions(latestPages.rows)) {
      const a = recommendAction(r, 'page');
      if (a) actions.push({ priority: r.impressions, text: a });
    }
  }

  const uniqueActions = [...new Map(actions.sort((a, b) => b.priority - a.priority).map((a) => [a.text, a])).values()].slice(0, 8);

  lines.push('## Prioritized actions (for agent)', '');
  if (uniqueActions.length) {
    uniqueActions.forEach((a, i) => lines.push(`${i + 1}. ${a.text}`));
  } else {
    lines.push('_No strong signals yet - export again after more impressions accumulate._');
  }
  lines.push('', '---', '_Re-run: `npm run gsc:analyze` after dropping new CSV exports._');

  return lines.join('\n');
}

const parsed = loadCsvFiles(GSC_DIR);
const report = buildReport(parsed);
writeFileSync(REPORT_PATH, report, 'utf8');

console.log(`Wrote ${REPORT_PATH}`);

const realFiles = parsed.filter((f) => f.data.rows.length > 0);
if (!realFiles.length) {
  console.log('\nNo GSC CSV files found yet. See data/gsc/EXPORT.txt');
  process.exit(0);
}

for (const f of realFiles) {
  console.log(`  ${f.data.type}: ${f.name} (${f.data.rows.length} rows)`);
}
