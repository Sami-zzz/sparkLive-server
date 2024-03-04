// WARN 全局常量

export const ALLOW_HTTP_CODE = {
  ok: 200, // 成功
  apiCache: 304, // 接口缓存
  paramsError: 400, // 参数错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 权限不足
  notFound: 404, // 未找到
  serverError: 500, // 服务器错误
};

export const ERROR_HTTP_CODE = {
  serverError: 10000, // 服务器错误
  banIp: 1000,
  adminDisableUser: 1001,
  notFound: 1002, // 返回了404的http状态码
  errStatusCode: 1003, // 返回了即不是200也不是404的http状态码
  shutdown: 1004, // 停机维护
};

export const HTTP_ERROE_MSG = {
  paramsError: '参数错误！',
  unauthorized: '未授权！',
  forbidden: '权限不足！',
  notFound: '未找到！',
  serverError: '服务器错误！',
};

export const HTTP_SUCCESS_MSG = {
  GET: '获取成功！',
  POST: '新增成功！',
  PUT: '修改成功！',
  DELETE: '删除成功！',
};

export enum PROJECT_ENV_ENUM {
  development = 'development',
  prod = 'prod',
  beta = 'beta',
}

export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;
