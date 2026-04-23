import { parseSortParam } from '../../shared/sorting';

describe('parseSortParam', () => {
  const allowedFields = ['id', 'name'] as const;

  it('returns ascending sort when field is provided', () => {
    const result = parseSortParam('name', allowedFields);

    expect(result).toEqual({
      field: 'name',
      direction: 'asc',
    });
  });

  it('returns descending sort when prefixed with -', () => {
    const result = parseSortParam('-id', allowedFields);

    expect(result).toEqual({
      field: 'id',
      direction: 'desc',
    });
  });

  it('returns default direction when sort is missing', () => {
    const result = parseSortParam(undefined, allowedFields);

    expect(result).toEqual({
      direction: 'asc',
    });
  });

  it('throws for unsupported sort field', () => {
    expect(() => parseSortParam('email', allowedFields)).toThrow(
      'sort must be one of: id, name'
    );
  });
});