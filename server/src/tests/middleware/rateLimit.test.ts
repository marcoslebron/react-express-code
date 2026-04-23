import express from 'express';
import request from 'supertest';
import { createUsersRateLimiter } from '../../middleware/rateLimit';

describe('usersRateLimiter', () => {
  it('returns 429 when the limit is exceeded', async () => {
    const app = express();
    app.use('/test', createUsersRateLimiter(2, 60_000));
    app.get('/test', (_req, res) => {
      res.status(200).json({ ok: true });
    });

    const first = await request(app).get('/test');
    const second = await request(app).get('/test');
    const third = await request(app).get('/test');

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(third.status).toBe(429);
    expect(third.body).toEqual({
      error: 'Too many requests, please try again later.',
    });
  });
});