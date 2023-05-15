export class ResultModel {

  code: string | number;
  msg: string;
  data: ListModel[] = [];
  doing: boolean;
  other: any;
  successful: boolean;

  constructor(result: result) {
    this.code = result?.code;
    this.msg = result?.msg;
    if (result?.data) {
      this.data = result.data.map((item:any) => {
        return new ListModel(item);
      });
    }
    this.doing = result?.doing;
    this.other = result?.other;
    this.successful = result?.successful;
  }

}

export class ListModel {

  /** @description: 标志 */ 
  dictCode: number;

  /** @description: 标签 */ 
  dictLabel: string;

  /** @description: 排序 */ 
  dictSort: number;

  /** @description: 字典类型 */ 
  dictType: string;

  /** @description: 值 */ 
  dictValue: string;

  /** @description:  */ 
  isDefault: string;

  /** @description:  */ 
  status: string;

  /** @description: 备注 */ 
  remark: string;

  constructor(item: any) {
    this.dictCode = item?.dictCode;
    this.dictLabel = item?.dictLabel;
    this.dictSort = item?.dictSort;
    this.dictType = item?.dictType;
    this.dictValue = item?.dictValue;
    this.isDefault = item?.isDefault;
    this.status = item?.status;
    this.remark= item?.remark;
  }

}