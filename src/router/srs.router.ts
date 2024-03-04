import Router from 'koa-router';

import srsController from '@/controller/srs.controller';

const srsRouter = new Router({ prefix: '/srs' });

srsRouter.post('/rtcV1Publish', srsController.rtcV1Publish);

srsRouter.post('/on_publish', srsController.onPublish);

srsRouter.post('/on_play', srsController.onPlay);

export default srsRouter;
