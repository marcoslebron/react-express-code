import { Request } from 'express';
import { getUsers } from '../../services/users.service';
import { User } from '../../data/users';

describe('getUsers', () => {
  const users: User[] = [
    { id: 0, name: 'Jorn' },
    { id: 3, name: 'Markus' },
    { id: 2, name: 'Andrew' },
    { id: 4, name: 'Ori' },
    { id: 1, name: 'Mike' },
  ];

  function createRequest(query: Record<string, unknown>): Request {
    return {
      query,
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3001'),
      baseUrl: '/api/users',
      path: '/',
    } as unknown as Request;
  }

  it('returns first page with next link and no previous link', () => {
    const req = createRequest({ page: '1', size: '2' });

    const result = getUsers(req, users);

    expect(result.data).toEqual([
      { id: 0, name: 'Jorn' },
      { id: 3, name: 'Markus' },
    ]);

    expect(result.paging).toEqual({
      totalResults: 5,
      next: 'http://localhost:3001/api/users?page=2&size=2',
    });
  });

  it('returns middle page with previous and next links', () => {
    const req = createRequest({ page: '2', size: '2' });

    const result = getUsers(req, users);

    expect(result.data).toEqual([
      { id: 2, name: 'Andrew' },
      { id: 4, name: 'Ori' },
    ]);

    expect(result.paging).toEqual({
      totalResults: 5,
      previous: 'http://localhost:3001/api/users?page=1&size=2',
      next: 'http://localhost:3001/api/users?page=3&size=2',
    });
  });

  it('returns last page with previous link and no next link', () => {
    const req = createRequest({ page: '3', size: '2' });

    const result = getUsers(req, users);

    expect(result.data).toEqual([{ id: 1, name: 'Mike' }]);

    expect(result.paging).toEqual({
      totalResults: 5,
      previous: 'http://localhost:3001/api/users?page=2&size=2',
    });
  });

  it('sorts ascending by name', () => {
    const req = createRequest({ sort: 'name', page: '1', size: '10' });

    const result = getUsers(req, users);

    expect(result.data).toEqual([
      { id: 2, name: 'Andrew' },
      { id: 0, name: 'Jorn' },
      { id: 3, name: 'Markus' },
      { id: 1, name: 'Mike' },
      { id: 4, name: 'Ori' },
    ]);

    expect(result.paging).toEqual({
      totalResults: 5,
    });
  });

  it('sorts descending by id', () => {
    const req = createRequest({ sort: '-id', page: '1', size: '10' });

    const result = getUsers(req, users);

    expect(result.data.map((user) => user.id)).toEqual([4, 3, 2, 1, 0]);
    expect(result.paging).toEqual({
      totalResults: 5,
    });
  });

  it('preserves sort in paging links', () => {
    const req = createRequest({ sort: 'name', page: '2', size: '2' });

    const result = getUsers(req, users);

    expect(result.paging).toEqual({
      totalResults: 5,
      previous: 'http://localhost:3001/api/users?page=1&size=2&sort=name',
      next: 'http://localhost:3001/api/users?page=3&size=2&sort=name',
    });
  });

  it('returns empty data for out-of-range page', () => {
    const req = createRequest({ page: '99', size: '10' });

    const result = getUsers(req, users);

    expect(result.data).toEqual([]);
    expect(result.paging).toEqual({
      totalResults: 5,
      previous: 'http://localhost:3001/api/users?page=98&size=10',
    });
  });

  it('throws for invalid page', () => {
    const req = createRequest({ page: '0', size: '2' });

    expect(() => getUsers(req, users)).toThrow('page must be a positive integer');
  });

  it('throws for invalid size', () => {
    const req = createRequest({ page: '1', size: '0' });

    expect(() => getUsers(req, users)).toThrow();
  });

  it('throws for invalid sort field', () => {
    const req = createRequest({ sort: 'email', page: '1', size: '10' });

    expect(() => getUsers(req, users)).toThrow('sort must be one of: id, name');
  });
});