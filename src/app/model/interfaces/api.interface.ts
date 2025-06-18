export type BodyParse = {
  [key in string]: any;
};

export type QueryParse = {
  [key in string]: any;
};

export type ParamsParse = {
  [key in string]: any;
};

export type ApiResponse<T = any> = {
  errorCode: number;
  data: T;
  message?: string;
  errors?: string[];
};

export type QueryResponse<T = any> = {
  data: {
    hits: T[];
    pagination: { totalRows: number; totalPages: number };
  };
  errorCode: string;
};
