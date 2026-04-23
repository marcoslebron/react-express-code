import { parsePageParams } from '../shared/query';
import { User } from '../data/users';
import { parseSortParam } from '../shared/sorting';
import { sortCollection } from '../shared/sorting';
import { buildPaging, paginateCollection } from '../shared/pagination';
import buildPageUri from '../utils/buildUri';
import { Request } from 'express';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

export type SortDirection = 'asc' | 'desc';
const USER_SORT_FIELDS = ['id', 'name'] as const;
type UserSortField = (typeof USER_SORT_FIELDS)[number];

export function getUsers(req: Request, users: User[]) {
  const query = req.query as Record<string, unknown>;
  const { page, size } = parsePageParams(query, MAX_PAGE_SIZE);
  const { field, direction } = parseSortParam<UserSortField>(query.sort, USER_SORT_FIELDS);

  const sorted = sortCollection(users, field, direction, 'id');
  const paged = paginateCollection(sorted, page, size);

  const paging = buildPaging({
    page,
    size,
    totalResults: sorted.length,
    buildPageUrl: (targetPage, targetSize) => buildPageUri(req, targetPage, targetSize, query.sort as string | undefined),
  });

  return {
    data: paged,
    paging,
  };
}
