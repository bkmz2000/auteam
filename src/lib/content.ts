export type AgeGroup = 'children' | 'teens' | 'adults';

export const ageGroups: { id: AgeGroup; label: string }[] = [
  { id: 'children', label: 'Детям' },
  { id: 'teens', label: 'Подросткам' },
  { id: 'adults', label: 'Взрослым' },
];

export function supportsAgeGroup(value: unknown, group: AgeGroup): boolean {
  return Array.isArray(value) ? value.includes(group) : value === group;
}

export function plainText(value: unknown): string {
  return String(value ?? '')
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function hasConvertedPrice(course: Record<string, any>): boolean {
  return Boolean(course.pricing?.convertedPrice ?? course.priceDram);
}

export function coursePrice(course: Record<string, any>): string {
  const price = course.pricing?.price ?? course.priceRub;
  const currency = course.pricing?.currency === 'amd' ? '֏' : '₽';
  const converted = course.pricing?.convertedPrice ?? course.priceDram;
  const convertedCurrency =
    course.pricing?.convertedCurrency === 'rub' ? '₽' : '֏';

  if (!price) return 'по договорённости';
  return converted ? `${price} ${currency} / ${converted} ${convertedCurrency}*` : `${price} ${currency}`;
}

export function courseDuration(course: Record<string, any>): string {
  return course.format?.duration ? `${course.format.duration} мин` : (course.duration ?? '');
}
