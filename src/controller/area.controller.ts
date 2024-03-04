import { ParameterizedContext } from 'koa';

import { CustomError } from '@/app/customError';
import { successHandler } from '@/app/handler/success-handle';
import { ALLOW_HTTP_CODE } from '@/constant';
import { IArea, IList } from '@/interface';
import areaService from '@/service/area.service';

class AreaController {
  common = {
    getList: async (data) => {
      const {
        id,
        name,
        remark,
        weight,
        orderBy = 'asc',
        orderName = 'id',
        nowPage,
        pageSize,
        keyWord,
        rangTimeType,
        rangTimeStart,
        rangTimeEnd,
      }: IList<IArea> = data;
      const result = await areaService.getList({
        id,
        name,
        remark,
        weight,
        nowPage,
        pageSize,
        orderBy,
        orderName,
        keyWord,
        rangTimeType,
        rangTimeStart,
        rangTimeEnd,
      });
      return result;
    },

    delete: async (id: number, isRoute?: boolean) => {
      const isExist = await areaService.isExist([id]);
      if (!isExist) {
        if (isRoute) {
          throw new CustomError(
            `不存在id为${id}的分区！`,
            ALLOW_HTTP_CODE.paramsError,
            ALLOW_HTTP_CODE.paramsError
          );
        }
      } else {
        await areaService.delete(id);
      }
    },
  };

  getList = async (ctx: ParameterizedContext, next) => {
    const result = await this.common.getList(ctx.request.query);
    successHandler({ ctx, data: result });

    await next();
  };

  async find(ctx: ParameterizedContext, next) {
    const id = +ctx.params.id;
    const result = await areaService.find(id);
    successHandler({ ctx, data: result });

    await next();
  }

  async create(ctx: ParameterizedContext, next) {
    const { name, remark, weight }: IArea = ctx.request.body;
    await areaService.create({
      name,
      remark,
      weight,
    });
    successHandler({ ctx });

    await next();
  }

  delete = async (ctx: ParameterizedContext, next) => {
    const id = +ctx.params.id;
    await this.common.delete(id, true);
    successHandler({ ctx });

    await next();
  };
}

export default new AreaController();
