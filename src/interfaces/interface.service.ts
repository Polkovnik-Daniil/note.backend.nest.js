import { ICrud } from "./interface.crud";

//На вход приходят разные dto!
export interface ICrudService<CreateDto, UpdateDto> extends ICrud {
    getCountPage(): any;
    getElementById(id: string): any;
    getPage(pageNumber: number): any;
    createElement(dto: CreateDto): any;
    createElements(dtos: CreateDto[]): any;
    deleteElement(id: string): any;
    deleteElements(dtos: any): any;
    deleteElementById(id: string): any;
    updateElement(dto: UpdateDto): any;
    updateElements(dtos: UpdateDto[]): any;
  }
  