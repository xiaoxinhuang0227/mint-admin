import request from "@/utils/request";
import { IComponentsInfo, IPageParams } from "@/api/type";

const BASE_URL = "/table";

export default class TableAPI {
  static getBasicTableData() {
    return request<any, IBaseTableResult>({
      url: `${BASE_URL}/basic`,
      method: "get",
    });
  }
  static getUseTableData(params: IPageParams) {
    return request<any, IUseTableResult>({
      url: `${BASE_URL}/useTable`,
      method: "get",
      params
    });
  }
  static getBasicFormData() {
    return request<any, IBaseFormResult>({
      url: `${BASE_URL}/basicForm`,
      method: "get",
    });
  }
  static getUseFormData() {
    return request<any, IUseTableResult>({
      url: `${BASE_URL}/useForm`,
      method: "get",
    });
  }
  static getUseSearchData() {
    return request<any, IUseSearchResult>({
      url: `${BASE_URL}/search`,
      method: "get",
    });
  }
  static getUseDescData() {
    return request<any, IUseTableResult>({
      url: `${BASE_URL}/desc`,
      method: "get",
    });
  }
  static getUseCurdData() {
    return request<any, IUseTableResult>({
      url: `${BASE_URL}/curd`,
      method: "get",
    });
  }
  static getTableData(params: IPageParams) {
    return request<any, ITableResult>({
      url: `${BASE_URL}/getTable`,
      method: "get",
      params
    });
  }
  static delTableData(data: number[]) {
    return request<any, any>({
      url: `${BASE_URL}/delTable`,
      method: "delete",
      data
    });
  }
  static saveTableData(data: ITableData) {
    return request<any, ITableData>({
      url: `${BASE_URL}/saveTable`,
      method: "post",
      data
    });
  }
}

export interface IUseSearchResult {
  searchComponents: IComponentsInfo[];
  useSearch: IComponentsInfo[];
}

export interface IBaseTableResult {
  tableColumns: IComponentsInfo[];
  tableAttributes: IComponentsInfo[];
}

export interface IBaseFormResult {
  formSchema: IComponentsInfo[];
  formAttributes: IComponentsInfo[];
}

export interface IUseTableResult {
  items: IComponentsInfo[];
  total: number;
}

export interface ITableData {
  id?: number;
  title: string;
  author: string;
  display_time?: string;
  pageviews: number;
}

export interface ITableResult {
  items: ITableData[];
  total: number;
}