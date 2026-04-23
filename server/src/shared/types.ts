export interface PageParams {
  page: number;
  size: number;
}

export interface Paging {
  previous?: string;
  next?: string;
  totalResults: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  paging: Paging;
}

export type SortDirection = 'asc' | 'desc';

export interface SortParams<TField extends string = string> {
  field?: TField;
  direction: SortDirection;
}