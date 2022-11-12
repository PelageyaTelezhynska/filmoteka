const { createProxyMiddleware } = require('http-proxy-middleware'); 

    const proxy = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/api',
        proxy({
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
        onProxyReq(proxyReq, req, res) {
            proxyReq.setHeader('x-api-key', 'fa9433e46ed4abfaeb75bcf31f473feb');
        },
        samesite : 'none',
        secure: true,
        })
    );
    }
    

    




