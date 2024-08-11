export interface IPageParams {
  pageIndex: number;
  pageSize: number;
}

export interface IComponentsInfo {
  name: string;
  desc: string;
  dataType: string;
  options?: any[];
  args?: string;
  res?: string;
  default?: string
}
