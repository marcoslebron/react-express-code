import { PageParams } from "./types";

export class QueryValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = 'QueryValidationError';
    this.statusCode = statusCode;
  }
}

export function parsePageParams(query: Record<string, unknown>, maxSize = 100): PageParams {
  const page = parsePositiveInterger(query.page ?? 1, 1, 'page');
  const size = parsePositiveInterger(query.size ?? 10, 10, 'size');

  if (!Number.isInteger(page) || page < 1) {
    throw new QueryValidationError('page must be a positive integer');
  }

  if (!Number.isInteger(size) || size < 1 || size > maxSize) {
    throw new QueryValidationError(`size must be between 1 and ${maxSize}`);
  }

  return { page, size };
}

export function parsePositiveInterger(
  value: unknown,
  defaultValue: number,
  fieldName: 'page' | 'size'
): number {
  if (value === undefined) {
    return defaultValue;
  }
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new QueryValidationError(`${fieldName} must be a positive integer`);
  }

  return parsed;
}