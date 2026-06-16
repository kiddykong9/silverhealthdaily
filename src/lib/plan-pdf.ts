import { jsPDF } from 'jspdf';
import type { HealthPlan } from './health-plan';
import type { PlanMeal, WeekDay } from './plan-week';
import { SITE } from './site';

const MARGIN = 16;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;
const LINE = 5.5;
const FOOTER_Y = 287;

function addFooter(doc: jsPDF, page: number, total: number) {
  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(`${SITE.name} · ${SITE.url}`, MARGIN, FOOTER_Y);
  doc.text(`Page ${page} of ${total}`, PAGE_W - MARGIN, FOOTER_Y, { align: 'right' });
  doc.setTextColor(0);
}

function ensureSpace(doc: jsPDF, y: number, need = 24): number {
  if (y + need > FOOTER_Y - 4) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function sectionTitle(doc: jsPDF, y: number, title: string) {
  y = ensureSpace(doc, y, 14);
  doc.setFillColor(45, 80, 60);
  doc.rect(MARGIN, y - 4, CONTENT_W, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255);
  doc.text(title, MARGIN + 3, y + 1.5);
  doc.setTextColor(0);
  return y + 12;
}

function bodyText(doc: jsPDF, y: number, text: string, indent = 0, size = 10) {
  y = ensureSpace(doc, y, 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  doc.text(lines, MARGIN + indent, y);
  return y + lines.length * LINE;
}

function bulletList(doc: jsPDF, y: number, items: string[]) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  for (const item of items) {
    y = ensureSpace(doc, y, 10);
    const lines = doc.splitTextToSize(item, CONTENT_W - 8);
    doc.text('•', MARGIN + 2, y);
    doc.text(lines, MARGIN + 8, y);
    y += lines.length * LINE + 1;
  }
  return y + 3;
}

function keyValue(doc: jsPDF, y: number, label: string, value: string) {
  y = ensureSpace(doc, y, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`${label}:`, MARGIN, y);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(value, CONTENT_W - 50);
  doc.text(lines, MARGIN + 48, y);
  return y + Math.max(LINE, lines.length * LINE) + 1;
}

function renderMeal(doc: jsPDF, y: number, label: string, meal: PlanMeal) {
  y = ensureSpace(doc, y, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${label}: ${meal.name} (${meal.calories} cal · ${meal.protein}g protein · ${meal.prepTime})`, MARGIN, y);
  y += LINE + 1;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Ingredients:', MARGIN + 2, y);
  y += LINE;
  y = bulletList(doc, y, meal.ingredients);
  doc.setFontSize(9);
  doc.text('Steps:', MARGIN + 2, y);
  y += LINE;
  y = bulletList(doc, y, meal.steps);
  if (meal.tip) y = bodyText(doc, y, `Tip: ${meal.tip}`, 2, 9);
  return y + 2;
}

function renderDay(doc: jsPDF, day: WeekDay, y: number) {
  const typeLabel =
    day.workout.type === 'rest' ? 'REST DAY' : day.workout.type === 'active_recovery' ? 'ACTIVE RECOVERY' : 'WORKOUT';

  y = sectionTitle(doc, y, `${day.weekday} — Day ${day.day}  [${typeLabel}]`);
  y = bodyText(doc, y, day.theme, 0, 9);
  y = bodyText(doc, y, day.dailyFocus, 0, 9);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  y = ensureSpace(doc, y, 10);
  doc.text(`${day.workout.title} · ${day.workout.durationMin} min · ${day.workout.intensity}`, MARGIN, y);
  y += LINE + 2;
  doc.setFont('helvetica', 'normal');
  y = bodyText(doc, y, `Step goal: ${day.workout.stepsGoal.toLocaleString()}`, 0, 9);
  y = bodyText(doc, y, day.workout.notes, 0, 9);

  if (day.workout.type !== 'rest') {
    y = bodyText(doc, y, 'Warm-up:', 0, 9);
    y = bulletList(doc, y, day.workout.warmup);
    y = bodyText(doc, y, 'Main session:', 0, 9);
    y = bulletList(doc, y, day.workout.main);
    y = bodyText(doc, y, 'Cool-down:', 0, 9);
    y = bulletList(doc, y, day.workout.cooldown);
  } else {
    y = bulletList(doc, y, day.workout.main);
  }

  y = sectionTitle(doc, y, `${day.weekday} — Meals`);
  y = renderMeal(doc, y, 'Breakfast', day.meals.breakfast);
  y = renderMeal(doc, y, 'Lunch', day.meals.lunch);
  y = renderMeal(doc, y, 'Dinner', day.meals.dinner);
  y = renderMeal(doc, y, 'Snack', day.meals.snack);

  y = keyValue(doc, y, 'Hydration', day.hydration);
  y = keyValue(doc, y, 'Evening', day.eveningRoutine);
  return y + 6;
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
  doc.rect(0, 0, PAGE_W, 85, 'F');
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('7-Day Health Program', MARGIN, 38);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Complete plan for ${name}`, MARGIN, 52);
  doc.setFontSize(10);
  doc.text(`${date} · Workouts · Recipes · Rest Days · Grocery List`, MARGIN, 62);
  doc.setTextColor(0);

  let y = 98;
  y = bodyText(doc, y, plan.summary);
  y += 4;
  y = bodyText(doc, y, plan.week.overview);
  y += 4;
  doc.setFontSize(8);
  doc.setTextColor(100);
  y = bodyText(
    doc,
    y,
    'Educational use only — not medical advice. Consult your healthcare provider before diet or exercise changes.',
  );
  doc.setTextColor(0);

  // Metrics overview
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, 'Your Numbers at a Glance');
  y = keyValue(doc, y, 'Daily calories', `${plan.energy.targetCalories.toLocaleString()} cal`);
  y = keyValue(doc, y, 'Protein target', `${plan.nutrition.grams} g/day`);
  y = keyValue(doc, y, 'Macros', plan.nutrition.splitLabel);
  y = keyValue(doc, y, 'Water', `${plan.hydration.oz} oz (${plan.hydration.glasses} glasses)`);
  y = keyValue(doc, y, 'Steps', plan.movement.stepGoal.toLocaleString());
  y = keyValue(doc, y, 'BMI', `${plan.body.bmi} — ${plan.body.category}`);
  y = keyValue(doc, y, 'Heart rate zone', plan.movement.heartRate.moderate);
  y += 4;

  y = sectionTitle(doc, y, 'Week Structure');
  y = keyValue(doc, y, 'Workout days', String(plan.week.workoutDays));
  y = keyValue(doc, y, 'Rest days', plan.week.restDayLabels.join(', ') || 'See daily schedule');
  y += 4;
  y = bodyText(doc, y, 'Daily meal calorie split:');
  y = bulletList(doc, y, [
    `Breakfast — ${plan.nutrition.meals.breakfast.cal} cal (${plan.nutrition.meals.breakfast.protein}g protein)`,
    `Lunch — ${plan.nutrition.meals.lunch.cal} cal (${plan.nutrition.meals.lunch.protein}g protein)`,
    `Dinner — ${plan.nutrition.meals.dinner.cal} cal (${plan.nutrition.meals.dinner.protein}g protein)`,
    `Snacks — ${plan.nutrition.meals.snacks.cal} cal (${plan.nutrition.meals.snacks.protein}g protein)`,
  ]);

  y = sectionTitle(doc, y, 'Week at a Glance');
  for (const day of plan.week.days) {
    const tag = day.workout.type === 'rest' ? 'REST' : day.workout.type === 'active_recovery' ? 'RECOVERY' : 'TRAIN';
    y = keyValue(
      doc,
      y,
      day.weekday,
      `[${tag}] ${day.workout.title} · ${day.meals.breakfast.name} → ${day.meals.dinner.name}`,
    );
  }

  // Grocery list
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, 'Grocery List (Week 1)');
  y = bodyText(doc, y, 'Shop once before Day 1. Adjust quantities based on household size.');
  y = bulletList(doc, y, plan.week.groceryList);

  // Each day in detail
  for (const day of plan.week.days) {
    doc.addPage();
    y = MARGIN;
    y = renderDay(doc, day, y);
  }

  // Sleep & habits
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, 'Sleep & Recovery');
  y = bodyText(doc, y, 'Recommended bedtimes:');
  y = bulletList(
    doc,
    y,
    plan.sleep.bedtimes.map((b) => `${b.time} — ${b.label}`),
  );
  y = sectionTitle(doc, y, '7-Night Sleep Habits');
  y = bulletList(doc, y, plan.sleep.sleepPlan);
  y = sectionTitle(doc, y, 'Weekly Habits');
  y = bulletList(doc, y, plan.habits);

  // Resources
  doc.addPage();
  y = MARGIN;
  y = sectionTitle(doc, y, 'Continue With Free Tools');
  y = bulletList(
    doc,
    y,
    plan.recommendedTools.map((t) => `${t.title} — ${SITE.url}${t.href}`),
  );
  y = sectionTitle(doc, y, 'Recommended Reading');
  y = bulletList(
    doc,
    y,
    plan.recommendedArticles.map((slug) => `${SITE.url}/articles/${slug}`),
  );

  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    if (p > 1) addFooter(doc, p, total);
  }

  const safeName = (plan.survey.name || 'health-plan').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  doc.save(`silver-health-7day-plan-${safeName}.pdf`);
}
