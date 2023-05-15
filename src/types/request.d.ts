interface need {
  token?: boolean;
  formData?: boolean;
}

interface requestConfig extends need {
  data?: any;
  header?: any;
  timeout?: number;
  dataType?: string;
  responseType?: string;
}

interface request extends requestConfig {
  success?:(any: any) => void, 
  fail?:(any: any) => void, 
  complete?:(any: any) => void
}

interface result {
  code: any; 
  rows: any;
  data:any; 
  msg:string;
  doing: boolean;
  other: any;
  successful: boolean;
}