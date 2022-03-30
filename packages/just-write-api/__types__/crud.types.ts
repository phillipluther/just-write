export enum CrudVerbs {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum HttpVerbs {
  CREATE = 'post',
  READ = 'get',
  UPDATE = 'put',
  DELETE = 'delete',
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
