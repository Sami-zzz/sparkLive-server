import { ParameterizedContext } from 'koa';

import { chalk, chalkINFO } from '@/utils/chalkTip';

export const apiBeforeVerify = async (ctx: ParameterizedContext, next) => {
  console.log('apiBeforeVerify中间件');
  const url = ctx.request.path;
  const ip = (ctx.request.headers['x-real-ip'] as string) || '127.0.0.1';
  const consoleEnd = () => {
    console.log(
      chalkINFO(
        `日期：${new Date().toLocaleString()}，ip：${ip}，http状态码：${
          ctx.status
        }，响应${ctx.request.method} ${url}`
      )
    );
  };

  console.log(
    chalkINFO(
      `日期：${new Date().toLocaleString()}，ip：${ip}，收到接口 ${
        ctx.request.method
      } ${url}请求`
    )
  );

  console.log(chalk.blueBright('query:'), { ...ctx.request.query });
  console.log(chalk.blueBright('params:'), ctx.params);
  console.log(chalk.blueBright('body:'), ctx.request.body);
  console.log(chalk.blueBright('referer:'), ctx.request.header.referer);
  console.log(chalk.blueBright('cookie:'), ctx.request.header.cookie);
  console.log(chalk.blueBright('token:'), ctx.request.headers.authorization);

  /**
   * 因为这个verify.middleware是最先执行的中间件路由，
   * 而且这个verify.middleware是异步的，因此如果需要等待异步执行完成才继续匹配后面的中间时，
   * 必须使用await next()，如果这里使用next()，就会返回数据了（404），也就是不会
   * 继续走后面的匹配了！但是如果加了await，就会等待后面的继续匹配完！
   */
  await next();
  consoleEnd();
};

// 全局错误处理中间件
export const catchErrorMiddle = async (ctx: ParameterizedContext, next) => {
  // 这个中间件是第一个中间件，得是异步的，否则直接就next到下一个中间件了
  console.log('catchErrorMiddle中间件');
  try {
    console.log('catchErrorMiddle中间件开始...');
    await next();
    console.log(
      chalkINFO(`catchErrorMiddle中间件通过！http状态码：${ctx.status}`)
    );
  } catch (error: any) {
    console.log('catchErrorMiddle中间件捕获到错误！');
    if (ctx.request.path.indexOf('/socket.io/') !== -1) {
      console.log('socket.io错误，return');
      return;
    }
    ctx.app.emit('error', error, ctx);
  }
};

// 跨域中间件
export const corsMiddle = async (ctx: ParameterizedContext, next) => {
  console.log('corsMiddle跨域中间件');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  ); // 允许的请求头
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 允许的方法

  // 如果是本地环境
  if (ctx.header.origin?.indexOf('http://localhost') !== -1) {
    ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie，Access-Control-Allow-Origin为*的时候不能设置Access-Control-Allow-Credentials:true！
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin!); // 允许的源
  } else {
    const allowOrigin = [
      'https://www.hsslive.cn',
      'https://admin.hsslive.cn',
      'https://live.hsslive.cn',
    ];
    // @ts-ignore
    if (allowOrigin === '*') {
      ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有源
    } else if (allowOrigin.includes(ctx.header.origin)) {
      ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie，Access-Control-Allow-Origin为*的时候不能设置Access-Control-Allow-Credentials:true！
      ctx.set('Access-Control-Allow-Origin', ctx.header.origin); // 允许的源
    } else {
      console.log('非法源！');
    }
  }

  if (ctx.method === 'OPTIONS') {
    // 跨域请求时，浏览器会先发送options
    ctx.body = 'ok';
  } else {
    await next();
    console.log(chalkINFO(`corsMiddle中间件通过！ `));
  }
};
