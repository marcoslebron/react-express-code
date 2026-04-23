import { parsePageParams } from '../../shared/query';

describe('parsePageParams', () => {
  it('uses defaults when no params are provided', () => {
    const result = parsePageParams({}, 100);

    expect(result).toEqual({
      page: 1,
      size: 10,
    });
  });

  it('parses valid page and size values', () => {
    const result = parsePageParams({ page: '2', size: '25' }, 100);

    expect(result).toEqual({
      page: 2,
      size: 25,
    });
  });

  it('throws for invalid page', () => {
    expect(() => parsePageParams({ page: '0' }, 100)).toThrow(
      'page must be a positive integer'
    );
  });

  it('throws for invalid size', () => {
    expect(() => parsePageParams({ size: '-1' }, 100)).toThrow(
      'size must be a positive integer'
    );
  });

  it('throws when size exceeds max', () => {
    expect(() => parsePageParams({ size: '101' }, 100)).toThrow(
      'size must be between 1 and 100'
    );
  });
});