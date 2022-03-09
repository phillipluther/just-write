interface ReadResponse<DataObj> {
  status: number;
  reason: string | null;
  max?: number;
  data: DataObj[];
}

export { ReadResponse };
