type requestConfig = {
  data?: any
  token?: boolean,
  header?: any,
  timeout?: number,
  dataType?: string,
  responseType?: string
}

type request = {
  data?: any,
  token?: boolean,
  header?: any,
  timeout?: number,
  dataType?: string,
  responseType?: string,
  success?:(any: any) => void, 
  fail?:(any: any) => void, 
  complete?:(any: any) => void
}

type needToken = {
  token?: boolean
}

type result = {
  code:string | number, 
  data:any, 
  msg:string
}