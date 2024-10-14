import express from 'express';
import { startOrchestrator } from './orchestrator';
import handleError from './middleware/errorHandle';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 5000;

app
  .use('/api/users', createProxyMiddleware({
    target: 'http://localhost:4001/api/users',
    changeOrigin: true,
  }))
  .use('/api/store', createProxyMiddleware({
    target: 'http://localhost:4002/api/store',
    changeOrigin: true,
  }))

  .use(express.json())
  .use(handleError as any)


app.listen(port, () => console.log(`Server running in ${port}`));