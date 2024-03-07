import './init/alias';
import { connectMysql } from './config/mysql';

async function main() {
  await connectMysql();
  await (await import('./setup')).setupKoa();
}

main();
