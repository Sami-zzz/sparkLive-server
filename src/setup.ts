import Koa from 'koa';
import koaBody from 'koa-body';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';

import { catchErrorMiddle, corsMiddle } from '@/app/app.middleware';
import { CustomError } from '@/app/customError';
import { errorHandler } from '@/app/handler/error-handle';
import { MYSQL_CONFIG } from '@/config/secret';
import { connectWebSocket } from '@/config/websocket';
import { PROJECT_ENV, PROJECT_NAME, PROJECT_PORT } from '@/constant';
import { loadAllRoutes } from '@/router';
import { chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

// const app = require('koa')();
// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
// io.on('connection', () => {
//   /* … */
// });
// server.listen(3000);

export async function setupKoa() {
  const port = +PROJECT_PORT;

  const app = new Koa();
  // app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For
  // app.proxyIpHeader = 'X-Real-IP';
  app.proxy = true;

  app.use(catchErrorMiddle); // 全局错误处理
  app.use(
    koaBody({
      multipart: true,
      onError(err) {
        console.log('koaBody错误', err);
        throw new CustomError(err.message, 500, 500);
      },
      // parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // 声明将解析正文的 HTTP 方法，默认值['POST', 'PUT', 'PATCH']。替换strict选项。
      // strict: true, // 废弃了。如果启用，则不解析 GET、HEAD、DELETE 请求，默认true。即delete不会解析data数据
    })
  ); // 解析参数
  app.use(conditional()); // 接口缓存
  app.use(etag()); // 接口缓存
  app.use(corsMiddle); // 设置允许跨域

  app.on('error', errorHandler); // 接收全局错误

  loadAllRoutes(app); // 加载所有路由

  // http接口服务
  await new Promise((resolve) => {
    // 语法糖, 等同于http.createServer(app.callback()).listen(3000);
    const httpServer = app.listen(port, () => {
      resolve('ok');
    });
    connectWebSocket(httpServer); // 初始化websocket
  }); // http接口服务
  console.log(chalkSUCCESS(`项目启动成功！`));
  console.log(chalkWARN(`监听端口: ${port}`));
  console.log(chalkWARN(`项目名称: ${PROJECT_NAME}`));
  console.log(chalkWARN(`项目环境: ${PROJECT_ENV}`));
  console.log(chalkWARN(`mysql数据库: ${MYSQL_CONFIG.database}`));
}
