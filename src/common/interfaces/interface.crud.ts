export interface ICrud<T> {
  getElementById(id: string): T;
  getCountPage(): number;
  createElement(dto: T): boolean;
  createElements(dtos: T[]): boolean;
  deleteElement(dto: T): boolean;
  deleteElements(dtos: T[]): boolean;
  deleteElementById(id: string): boolean;
  updateElement(dto: T): boolean;
  updateElements(dtos: T[]): boolean;
}
