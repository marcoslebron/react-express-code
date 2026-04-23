import app from './config/express';
import routes from './routes/index.route';

// Router
app.use('/api', routes);

export default app;
