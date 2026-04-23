import { logger } from '../../utils/logger';

describe('logger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('calls console.info', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.info('users fetched', { page: 1, size: 10 });

    expect(spy).toHaveBeenCalledWith('[INFO] users fetched', { page: 1, size: 10 });
  });

  it('calls console.warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    logger.warn('invalid query', { page: 0 });

    expect(spy).toHaveBeenCalledWith('[WARN] invalid query', { page: 0 });
  });

  it('calls console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    logger.error('unexpected failure', { error: 'boom' });

    expect(spy).toHaveBeenCalledWith('[ERROR] unexpected failure', { error: 'boom' });
  });

  it('defaults metadata to empty object', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    logger.info('hello');

    expect(spy).toHaveBeenCalledWith('[INFO] hello', {});
  });
});