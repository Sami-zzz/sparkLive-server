// WARN 全局接口

export type IList<T> = {
  nowPage?: string;
  pageSize?: string;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: string;
  rangTimeEnd?: string;
} & T;

export interface IArea {
  id?: number;
  /** 分区名 */
  name?: string;
  /** 权重 */
  weight?: number;
  /** 备注 */
  remark?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
