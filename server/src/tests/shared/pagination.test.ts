import { paginateCollection, buildPaging } from '../../shared/pagination';

describe('paginateCollection', () => {
  it('returns the first page', () => {
    const items = [1, 2, 3, 4, 5];
    const result = paginateCollection(items, 1, 2);

    expect(result).toEqual([1, 2]);
  });

  it('returns the second page', () => {
    const items = [1, 2, 3, 4, 5];
    const result = paginateCollection(items, 2, 2);

    expect(result).toEqual([3, 4]);
  });

  it('returns an empty array when page exceeds bounds', () => {
    const items = [1, 2, 3];
    const result = paginateCollection(items, 5, 2);

    expect(result).toEqual([]);
  });
});

describe('buildPaging', () => {
  it('returns next but not previous on the first page', () => {
    const paging = buildPaging({
      page: 1,
      size: 2,
      totalResults: 5,
      buildPageUrl: (page, size) => `/api/users?page=${page}&size=${size}`,
    });

    expect(paging).toEqual({
      totalResults: 5,
      next: '/api/users?page=2&size=2',
    });
  });

  it('returns previous and next on a middle page', () => {
    const paging = buildPaging({
      page: 2,
      size: 2,
      totalResults: 5,
      buildPageUrl: (page, size) => `/api/users?page=${page}&size=${size}`,
    });

    expect(paging).toEqual({
      totalResults: 5,
      previous: '/api/users?page=1&size=2',
      next: '/api/users?page=3&size=2',
    });
  });

  it('returns previous but not next on the last page', () => {
    const paging = buildPaging({
      page: 3,
      size: 2,
      totalResults: 5,
      buildPageUrl: (page, size) => `/api/users?page=${page}&size=${size}`,
    });

    expect(paging).toEqual({
      totalResults: 5,
      previous: '/api/users?page=2&size=2',
    });
  });
});