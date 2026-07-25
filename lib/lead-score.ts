const SIZE_WEIGHTS: Record<string, number> = {
  '1-19': 10,
  '20-50': 25,
  '50-250': 40,
  '250-1000': 35,
  '500+': 30,
};

export function scoreLead(input: { size?: string; budget?: string; modules?: string[]; message?: string }): number {
  let score = 20;

  if (input.size && SIZE_WEIGHTS[input.size]) {
    score += SIZE_WEIGHTS[input.size];
  }

  const budgetNumber = parseFloat((input.budget || '').replace(/[^0-9.]/g, ''));
  if (!Number.isNaN(budgetNumber) && budgetNumber > 0) {
    if (budgetNumber >= 1000000) score += 25;
    else if (budgetNumber >= 100000) score += 15;
    else score += 5;
  }

  if (input.modules && input.modules.length > 0) {
    score += Math.min(input.modules.length * 3, 15);
  }

  if (input.message && input.message.length > 20) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}
