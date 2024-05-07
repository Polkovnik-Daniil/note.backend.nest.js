import { Delete, Get, Injectable, Logger, Post, Put } from '@nestjs/common';
import { Type } from '@nestjs/common';
import { ICrud } from '../interfaces/interface.crud';

type Constructor<I> = new (...args: any[]) => I; // Main Point
export function CommonCrudController<T>(entity: Constructor<T>): Type<ICrud> {
  @Injectable()
  class CommonCrudControllerHost implements ICrud {
    constructor(public readonly service: ICrud) {}
    @Get('/')
    async getPage(numberPage: number): Promise<any> {
      return await this.service.getPage(numberPage).catch((ex) => {
        Logger.log(ex.message);
      });
    }
    @Get('/page')
    async getCountPage(): Promise<number> {
      return await this.service.getCountPage();
    }
    @Get(':id')
    async getElementById(id: string): Promise<boolean> {
      return await this.service.deleteElementById(id);
    }
    @Post('/')
    async createElement(dto: any): Promise<boolean> {
      // convert dto to entity
      return await this.service.createElement(dto);
    }
    @Post('/')
    async createElements(dtos: any): Promise<boolean> {
      // convert dto to entity
      return await this.service.createElements(dtos);
    }
    @Delete('/')
    async deleteElement(dto: any): Promise<boolean> {
      // convert dto to entity
      return await this.service.deleteElement(dto);
    }
    @Delete('/')
    deleteElements(dtos: any): boolean {
      // convert dto to entity
      return this.service.deleteElements(dtos);
    }
    @Delete(':id')
    deleteElementById(id: string): boolean {
      // convert dto to entity
      return this.service.deleteElementById(id);
    }
    @Put('/')
    updateElement(dto: any): boolean {
      // convert dto to entity
      return this.service.updateElement(dto);
    }
    @Put('/')
    updateElements(dtos: any): boolean {
      // convert dto to entity
      return this.service.updateElement(dtos);
    }
  }
  return CommonCrudControllerHost;
}
