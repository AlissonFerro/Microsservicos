import express from 'express';
import { startOrchestrator } from './orchestrator';
import handleError from './middleware/errorHandle';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 5000;

app.use('/', createProxyMiddleware({
    target: 'http://localhost:4001',
    changeOrigin: true,
  }));

app.use(express.json());

startOrchestrator(app)

app.use(handleError as any);


app.listen(port, () => console.log(`Server running in ${port}`));