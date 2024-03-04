import axios from 'axios';
import { ParameterizedContext } from 'koa';

import { successHandler } from '@/app/handler/success-handle';

class SRSController {
  async rtcV1Publish(ctx: ParameterizedContext, next) {
    const { streamurl, sdp } = ctx.request.body;
    const srsRes = await axios.post('http://localhost:1985/rtc/v1/publish/', {
      sdp,
      streamurl,
    });
    successHandler({ ctx, data: srsRes.data });
    await next();
  }

  async onPublish(ctx: ParameterizedContext, next) {
    // ffmpeg -re -stream_loop -1 -i /Users/huangshuisheng/Movies/video/zjl_bnsdmm.mp4 -c copy -f flv 'rtmp://localhost/billd/ppp?token=1234'
    // 推流地址是：rtmp://localhost/billd/ppp?token=1234
    // rtmp://localhost/应用名字/视频流名字或者是房间id?token=1234
    const { body } = ctx.request;
    console.log('srs回调的on_publish参数', body);
    // successHandler({ ctx, data: { code: 0 } });
    ctx.body = {
      code: 0,
    };
    await next();
  }

  async onPlay(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    console.log('srs回调的on_play参数', body);
    ctx.body = {
      code: 0,
    };
    await next();
  }
}

export default new SRSController();
