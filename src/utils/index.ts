/** 处理返回的分页数据 */
export const handlePaging = <T>(
  result: any,
  nowPage?: string,
  pageSize?: string
) => {
  // @ts-ignore
  const obj: {
    nowPage: number;
    pageSize: number;
    hasMore: boolean;
    total: number;
    rows: T[];
  } = {};
  obj.nowPage = nowPage ? +nowPage : 1;
  obj.pageSize = pageSize ? +pageSize : result.count;
  obj.hasMore = obj.nowPage * obj.pageSize - result.count < 0;
  obj.total = result.count;
  obj.rows = result.rows;
  return obj;
};
