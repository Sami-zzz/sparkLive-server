import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';

export const JWT_SECRET = '123abc666'; // jwt秘钥

export const MYSQL_CONFIG = {
  docker: {
    container: 'billd-live-class-mysql',
    image: 'mysql:8.0',
    port: { 3306: 3306 },
    MYSQL_ROOT_PASSWORD:
      PROJECT_ENV === PROJECT_ENV_ENUM.development ? 'mysql123.' : 'mysql123.',
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '/Users/huangshuisheng/Desktop/docker/mysql'
        : '/Users/huangshuisheng/Desktop/docker/mysql',
  },
  database:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? 'billd_live_class_test'
      : 'billd_live_class',
  host:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? '127.0.0.1' : '127.0.0.1',
  port: 3306,
  username: 'root',
  password:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? 'mysql123.' : 'mysql123.',
}; // Mysql配置
