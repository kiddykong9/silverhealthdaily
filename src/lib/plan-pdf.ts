import { jsPDF } from 'jspdf';
import type { HealthPlan } from './health-plan';
import { SITE } from './site';

const MARGIN = 18;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LINE = 6;

function addFooter(doc: jsPDF, page: number, total: number) {
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(`${SITE.name} · ${SITE.url}`, MARGIN, 287);
  doc.text(`Page ${page} of ${total}`, PAGE_W - MARGIN, 287, { align: 'right' });
  doc.setTextColor(0);
}

function sectionTitle(doc: jsPDF, y: number, title: string) {
  doc.setFillColor(45, 80, 60);
  doc.rect(MARGIN, y - 4, CONTENT_W, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255);
  doc.text(title, MARGIN + 3, y + 1.5);
  doc.setTextColor(0);
  return y + 12;
}

function bodyText(doc: jsPDF, y: number, text: string, indent = 0) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  doc.text(lines, MARGIN + indent, y);
  return y + lines.length * LINE;
}

function bulletList(doc: jsPDF, y: number, items: string[]) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  for (const item of items) {
    const lines = doc.splitTextToSize(item, CONTENT_W - 8);
    doc.text('•', MARGIN + 2, y);
    doc.text(lines, MARGIN + 8, y);
    y += lines.length * LINE + 1;
  }
  return y + 4;
}

function keyValue(doc: jsPDF, y: number, label: string, value: string) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${label}:`, MARGIN, y);
  doc.setFont('helvetica', 'normal');
  doc.text(value, MARGIN + 52, y);
  return y + LINE + 1;
}

export function generatePlanPdf(plan: HealthPlan): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const name = plan.survey.name || 'Your';
  const date = new Date(plan.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Cover
  doc.setFillColor(45, 80, 60);
  doc.rect(0, 0, PAGE_W, 70, 'F');
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Personal Health Plan', MARGIN, 35);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Prepared for ${name}`, MARGIN, 48);
  doc.setFontSize(10);
  doc.text(date, MARGIN, 58);
  doc.setTextColor(0);

  let y = 85;
  y = bodyText(doc, y, plan.summary);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(100);
  y = bodyText(
    doc,
    y,
    'This plan is for educational purposes only and is not medical advice. Consult your healthcare provider before making significant diet or exercise changes.',
  );
  doc.setTextColor(0);

  // Page 2 — Body & Energy
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, '1. Body Metrics & Energy');
  y = keyValue(doc, y, 'BMI', `${plan.body.bmi} — ${plan.body.category}`);
  y = keyValue(
    doc,
    y,
    'Healthy weight',
    `${plan.body.idealWeight.lowKg}–${plan.body.idealWeight.highKg} kg`,
  );
  y = keyValue(doc, y, 'BMR', `${plan.energy.bmr.toLocaleString()} cal/day`);
  y = keyValue(doc, y, 'TDEE (maintenance)', `${plan.energy.tdee.toLocaleString()} cal/day`);
  y = keyValue(doc, y, 'Daily target', `${plan.energy.targetCalories.toLocaleString()} cal/day`);
  if (plan.energy.dailyDeficit > 0) {
    y = keyValue(
      doc,
      y,
      'Deficit',
      `${plan.energy.dailyDeficit} cal/day (~${plan.energy.weeklyLossKg} kg/week)`,
    );
  }
  y += 4;
  y = sectionTitle(doc, y, '2. Nutrition Targets');
  y = keyValue(doc, y, 'Protein', `${plan.nutrition.grams} g/day (${plan.nutrition.range})`);
  y = keyValue(doc, y, 'Macros', plan.nutrition.splitLabel);
  y = keyValue(doc, y, 'Protein (macro)', `${plan.nutrition.proteinG} g`);
  y = keyValue(doc, y, 'Carbs', `${plan.nutrition.carbsG} g`);
  y = keyValue(doc, y, 'Fat', `${plan.nutrition.fatG} g`);
  y += 4;
  y = bodyText(doc, y, 'Suggested meal split:');
  y = bulletList(doc, y, [
    `Breakfast — ${plan.nutrition.meals.breakfast.cal} cal, ${plan.nutrition.meals.breakfast.protein}g protein`,
    `Lunch — ${plan.nutrition.meals.lunch.cal} cal, ${plan.nutrition.meals.lunch.protein}g protein`,
    `Dinner — ${plan.nutrition.meals.dinner.cal} cal, ${plan.nutrition.meals.dinner.protein}g protein`,
    `Snacks — ${plan.nutrition.meals.snacks.cal} cal, ${plan.nutrition.meals.snacks.protein}g protein`,
  ]);

  // Page 3 — Hydration & Movement
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, '3. Hydration');
  y = keyValue(doc, y, 'Daily water', `${plan.hydration.oz} oz (${plan.hydration.liters} L)`);
  y = keyValue(doc, y, 'Glasses (8 oz)', `${plan.hydration.glasses} glasses`);
  y += 4;
  y = bodyText(doc, y, '7-day hydration plan:');
  y = bulletList(doc, y, plan.sleep.hydrationPlan);
  y = sectionTitle(doc, y, '4. Movement & Steps');
  y = keyValue(doc, y, 'Daily step goal', plan.movement.stepGoal.toLocaleString());
  y = keyValue(
    doc,
    y,
    'Walking burn',
    `${plan.movement.walking.calories} cal per ${plan.survey.walkingMinutes} min walk`,
  );
  y = keyValue(doc, y, 'Max heart rate', `${plan.movement.heartRate.maxHr} bpm`);
  y = keyValue(doc, y, 'Moderate zone', plan.movement.heartRate.moderate);
  y = keyValue(doc, y, 'Vigorous zone', plan.movement.heartRate.vigorous);
  y += 4;
  y = bodyText(doc, y, '7-day walking plan:');
  y = bulletList(doc, y, plan.movement.walkingPlan);

  // Page 4 — Sleep & Habits
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, '5. Sleep Schedule');
  y = bodyText(doc, y, 'Recommended bedtimes based on your wake time:');
  y = bulletList(
    doc,
    y,
    plan.sleep.bedtimes.map((b) => `${b.time} — ${b.label}`),
  );
  y = sectionTitle(doc, y, '6. 7-Day Sleep Plan');
  y = bulletList(doc, y, plan.sleep.sleepPlan);
  y = sectionTitle(doc, y, '7. Daily Habits');
  y = bulletList(doc, y, plan.habits);

  // Page 5 — Resources
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, '8. Recommended Free Tools');
  y = bulletList(
    doc,
    y,
    plan.recommendedTools.map((t) => `${t.title} — ${SITE.url}${t.href}`),
  );
  y = sectionTitle(doc, y, '9. Articles to Read');
  y = bulletList(
    doc,
    y,
    plan.recommendedArticles.map((slug) => `${SITE.url}/articles/${slug}`),
  );
  y += 6;
  y = bodyText(
    doc,
    y,
    `Track progress weekly with our free tools at ${SITE.url}/tools. Re-run this survey anytime your goals change.`,
  );

  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    if (p > 1) addFooter(doc, p, total);
  }

  const safeName = (plan.survey.name || 'health-plan').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  doc.save(`silver-health-plan-${safeName}.pdf`);
}
