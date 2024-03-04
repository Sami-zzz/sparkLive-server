// 一定要将import './init';放到最开头,因为它里面初始化了路径别名
import './init/alias';

async function main() {
  // await connectMysql();
  await (await import('./setup')).setupKoa();
}

main();
