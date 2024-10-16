import express from 'express';
import handleError from './middleware/errorHandle';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 5000;

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const serviceMap: Record<string, string> = {
    '/api/users': 'http://localhost:4001/api/users',
    '/api/store': 'http://localhost:4002/api/store',
    '/api/product': 'http://localhost:4002/api/product',
};

app.use((req, res, next) => {
    const target = serviceMap[req.path.split('/').slice(0, 3).join('/')];

    if (target) {
        return createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: (path) => {
                return path.replace(/^\/api\/[^/]+/, '');
            },
        })(req, res, next);
    }

    next();
})

  .use(express.json())
  .use(handleError as any);

app.listen(port, () => console.log(`Server running on port ${port}`));