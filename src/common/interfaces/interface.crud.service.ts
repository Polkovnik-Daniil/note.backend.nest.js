import { ICrud } from "./interface.crud";

export interface ICrudService<T> extends ICrud<T>{
  getPage<T>(numberPage: number): T[];
}
