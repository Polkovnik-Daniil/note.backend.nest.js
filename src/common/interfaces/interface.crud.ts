//На вход приходят разные dto!
export interface ICrud {
  getCountPage(): any;
  getElementById(id: string): any;
  getPage(pageNumber: number): any;
  createElement(dto: any): any;
  createElements(dtos: any): any;
  deleteElement(dto: any): any;
  deleteElements(dtos: any): any;
  deleteElementById(id: string): any;
  updateElement(dto: any): any;
  updateElements(dtos: any): any;
}
