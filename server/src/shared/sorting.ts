import { QueryValidationError } from "./query";
import { SortDirection, SortParams } from "./types";

export function parseSortParam<TField extends string>(
  rawSort: unknown,
  allowedFields: readonly TField[]
): SortParams<TField> {
  if (typeof rawSort !== 'string' || !rawSort.trim()) {
    return { direction: 'asc' };
  }

  const trimmed = rawSort.trim();
  const direction: SortDirection = trimmed.startsWith('-') ? 'desc' : 'asc';
  const field = trimmed.replace(/^-/, '') as TField;

  if (!allowedFields.includes(field)) {
    throw new QueryValidationError(`sort must be one of: ${allowedFields.join(', ')}`);
  }

  return { field, direction };
}

export function sortCollection<T extends Record<string, unknown>, K extends keyof T>(
  items: T[],
  field: K | undefined,
  direction: SortDirection = 'asc',
  fallbackField?: K
): T[] {
  if (!field) return [...items];

  const multiplier = direction === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    const first = compareValues(a[field], b[field]) * multiplier;
    if (first !== 0) return first;

    if (fallbackField) {
      return compareValues(a[fallbackField], b[fallbackField]);
    }

    return 0;
  });
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

// function compareDates(left: unknown, right: unknown): number {

//   const dateA =  new Date(left as string);
//   const dateB = new Date(right as string);

//   return dateA.getTime() - dateB.getTime();
// }