import { Paging } from "./types";

export function paginateCollection<T>(items: T[], page: number, size: number): T[] {
  const start = (page - 1) * size;
  return items.slice(start, start + size);
}

export function buildPaging(params: {
  page: number;
  size: number;
  totalResults: number;
  buildPageUrl: (page: number, size: number) => string;
}): Paging {
  const { page, size, totalResults, buildPageUrl } = params;

  const paging: Paging = { totalResults };

  if (page > 1) {
    paging.previous = buildPageUrl(page - 1, size);
  }

  if (page * size < totalResults) {
    paging.next = buildPageUrl(page + 1, size);
  }

  return paging;
}