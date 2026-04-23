import rateLimit from 'express-rate-limit';

export function createUsersRateLimiter(max = 100, windowMs = 15 * 60 * 1000) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests, please try again later.',
    },
  });
}

const usersRateLimiter = createUsersRateLimiter();

export default usersRateLimiter;