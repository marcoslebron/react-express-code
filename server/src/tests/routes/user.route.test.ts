import request from 'supertest';
import app from '../../app';

describe('GET /api/users', () => {
  it('returns paginated users with next link on first page', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ page: 1, size: 2 });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.paging.totalResults).toBe(5);
    expect(response.body.paging.previous).toBeUndefined();
    expect(response.body.paging.next).toContain('/api/users?page=2&size=2');
  });

  it('returns previous and next when applicable', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ page: 2, size: 2 });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
    expect(response.body.paging.totalResults).toBe(5);
    expect(response.body.paging.previous).toContain('/api/users?page=1&size=2');
    expect(response.body.paging.next).toContain('/api/users?page=3&size=2');
  });

  it('sorts dynamically by a user field ascending', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ sort: 'name', page: 1, size: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data.map((user: { name: string }) => user.name)).toEqual([
      'Andrew',
      'Jorn',
      'Markus',
      'Mike',
      'Ori',
    ]);
  });

  it('supports descending sort using -field', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ sort: '-id', page: 1, size: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data.map((user: { id: number }) => user.id)).toEqual([4, 3, 2, 1, 0]);
  });

  it('returns 400 for invalid sort field', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ sort: 'unknownField' });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('sort must be one of: id, name');
  });

  it('returns 400 for invalid page', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ page: 0 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('page must be a positive integer');
  });

  it('returns 400 for invalid size', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ size: 0 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('size must be a positive integer');
  });

  it('caps oversized page requests with validation', async () => {
    const response = await request(app)
      .get('/api/users')
      .query({ size: 500 });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('size must be between 1 and 100');
  });
});