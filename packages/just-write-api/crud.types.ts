interface ReadResponse<DataObj> {
  status: number;
  reason: string | null;
  max?: number;
  data: DataObj[];
}

interface ReadRequestOptions {
  limit: number;
  cursor: number;
}

export { ReadResponse, ReadRequestOptions };
