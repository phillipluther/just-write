export enum CrudMethods {
  create,
  read,
  update,
  delete,
}

export enum CrudVerbs {
  post,
  get,
  put,
  delete,
}

export interface ReadResponse<DataObj> {
  status: number;
  reason: string | null;
  max?: number;
  data: DataObj[];
}

export interface ReadRequestOptions {
  limit: number;
  cursor: number;
}
