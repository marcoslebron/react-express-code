import express, { Request, Response } from 'express';
import { users } from '../data/users';
import { logger } from '../utils/logger';
import { QueryValidationError } from '../shared/query';
import { getUsers } from '../services/users.service';
import usersRateLimiter from '../middleware/rateLimit';

const router = express.Router();

router.get('/', usersRateLimiter, (req: Request, res: Response) => {
  try {
    const result = getUsers(req, users);
    
    logger.info(`Fetched users - page: ${result.paging}, size: ${result.paging}, sort: ${req.query.sort || 'none'}`, {
      sort: req.query.sort ?? null,
      returnedResults: result.data.length,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof QueryValidationError) {
      logger.warn('Invalid query parameters', { error });
      return res.status(400).send({ error: error.message });
    } else {
      logger.error('Unexpected error occurred', { error });
      return res.status(500).send({ error: 'Internal server error' });
    }
  }
});

export default router;