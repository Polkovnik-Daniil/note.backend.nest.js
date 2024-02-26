import { ICrudService } from '../interfaces/interface.crud.service';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from '@nestjs/common';

type Constructor<I> = new (...args: any[]) => I; // Main Point
export function CommonCrudService<T>(
  entity: Constructor<T>,
): Type<ICrudService<T>> {
  @Injectable()
  class CommonCrudServiceHost<T> implements ICrudService<T> {
    constructor(
      @InjectRepository(entity) public readonly repository: Repository<T>,
    ) {}
    getPage<T>(numberPage: number): T[] {
      throw new Error('Method not implemented.');
    }
    getElementById(id: string): T {
      throw new Error('Method not implemented.');
    }
    getCountPage(): number {
      throw new Error('Method not implemented.');
    }
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
  return CommonCrudServiceHost;
}
