import Router from 'koa-router';

import areaController from '@/controller/area.controller';

const areaRouter = new Router({ prefix: '/area' });

areaRouter.get('/list', areaController.getList);

export default areaRouter;
