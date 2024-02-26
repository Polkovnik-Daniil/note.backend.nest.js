import { ICrud } from "./interface.crud";

export interface ICrudController<T> extends ICrud<T>{
  getPage(numberPage: number): T[];
}
