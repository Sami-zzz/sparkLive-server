import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';

export const JWT_SECRET = '123abc666'; // jwt秘钥

export const MYSQL_CONFIG = {
  docker: {
    container: 'sparkLive-mysql',
    image: 'mysql:8.0',
    port: { 3306: 3306 },
    MYSQL_ROOT_PASSWORD:
      PROJECT_ENV === PROJECT_ENV_ENUM.development ? 'asd123456' : 'asd123456',
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? 'C:\\Users\\aaa\\Desktop\\docker\\mysql'
        : 'C:\\Users\\aaa\\Desktop\\docker\\mysql',
  },
  database:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? 'sparkLive'
      : 'sparkLiveProd',
  host:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? '127.0.0.1' : '127.0.0.1',
  port: 3306,
  username: 'root',
  password:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? 'asd123456' : 'asd123456',
}; // Mysql配置
