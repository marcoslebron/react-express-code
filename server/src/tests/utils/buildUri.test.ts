import { Request } from 'express';
import buildPageUri from '../../utils/buildUri';

describe('buildPageUri', () => {
  function createRequest(): Request {
    return {
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3001'),
      baseUrl: '/api/users',
    } as unknown as Request;
  }

  it('builds uri with page and size', () => {
    const req = createRequest();

    const result = buildPageUri(req, 2, 25);

    expect(result).toBe('http://localhost:3001/api/users?page=2&size=25');
  });

  it('builds uri with sort when provided', () => {
    const req = createRequest();

    const result = buildPageUri(req, 3, 10, 'name');

    expect(result).toBe('http://localhost:3001/api/users?page=3&size=10&sort=name');
  });

  it('supports descending sort format', () => {
    const req = createRequest();

    const result = buildPageUri(req, 1, 50, '-id');

    expect(result).toBe('http://localhost:3001/api/users?page=1&size=50&sort=-id');
  });
});