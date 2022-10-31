export class ResultModel {

  code:string | number; 
  rows: any;
  data:any; 
  msg:string;

  constructor(result: result) {
    this.code = result?.code;
    this.rows = result?.rows;
    this.data = result?.data;
    this.msg = result?.msg;
  }

}