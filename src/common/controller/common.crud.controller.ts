import { ICrudController } from '../interfaces/interface.crud.controller';

import { Get, Injectable, Logger, Post } from '@nestjs/common';
import { Type } from '@nestjs/common';
import { ICrudService } from '../interfaces/interface.crud.service';

type Constructor<I> = new (...args: any[]) => I; // Main Point
export function CommonCrudController<T>(
  entity: Constructor<T>,
): Type<ICrudController<T>> {
  @Injectable()
  class CommonCrudControllerHost<T> implements ICrudController<T> {
    constructor(public readonly service: ICrudService<T>) {}
    @Get('/')
    getPage(numberPage: number): T[] {
      throw new Error('Method not implemented.');
    }
    @Get(':id')
    getElementById(id: string): T {
      throw new Error('Method not implemented.');
    }
    @Get('/page')
    getCountPage(): number {
      throw new Error('Method not implemented.');
    }
    @Post('/')
    createElement(dto: T): boolean {
      throw new Error('Method not implemented.');
    }
    createElements(dtos: T[]): boolean {
      throw new Error('Method not implemented.');
    }
    deleteElement(dto: T): boolean {
      throw new Error('Method not implemented.');
    }
    deleteElements(dtos: T[]): boolean {
      throw new Error('Method not implemented.');
    }
    deleteElementById(id: string): boolean {
      throw new Error('Method not implemented.');
    }
    updateElement(dto: T): boolean {
      throw new Error('Method not implemented.');
    }
    updateElements(dtos: T[]): boolean {
      throw new Error('Method not implemented.');
    }
  }
  return CommonCrudControllerHost;
}

// @Injectable()
// export class GeneralizedController<T> implements ICrudController<T> {
//   constructor(
//     @InjectRepository(T) private readonly repository: Repository<T>,
//   ) {}
//     getPage(numberPage: number): T[] {
//         throw new Error('Method not implemented.');
//     }
//     getElementById(id: string): T {
//         throw new Error('Method not implemented.');
//     }
//     getCountPage(): number {
//         throw new Error('Method not implemented.');
//     }
//     createElement(dto: T): boolean {
//         throw new Error('Method not implemented.');
//     }
//     createElements(dtos: T[]): boolean {
//         throw new Error('Method not implemented.');
//     }
//     deleteElement(dto: T): boolean {
//         throw new Error('Method not implemented.');
//     }
//     deleteElements(dtos: T[]): boolean {
//         throw new Error('Method not implemented.');
//     }
//     deleteElementById(id: string): boolean {
//         throw new Error('Method not implemented.');
//     }
//     updateElement(dto: T): boolean {
//         throw new Error('Method not implemented.');
//     }
//     updateElements(dtos: T[]): boolean {
//         throw new Error('Method not implemented.');
//     }
// }
