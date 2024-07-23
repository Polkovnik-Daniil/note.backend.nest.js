import { ICrud } from '../interfaces/interface.crud';

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Type } from '@nestjs/common';
import { Constructor } from '@local-type/type.constructor';

export function CommonCrudService<T>(entity: Constructor<T>): Type<ICrud> {
  @Injectable()
  class CommonCrudServiceHost<T> implements ICrud {
    constructor(
      @InjectRepository(entity) public readonly repo: Repository<T>,
    ) {}
    createElement(entity: any): any {
      try {
        this.repo.save(entity);
      } catch (ex) {
        Logger.log(ex.message);
      }
    }
    createElements(entities: any[]): boolean {
      entities.map((entity) => {
        this.repo.save(entity);
      });
      return true;
    }
    async deleteElement(entity: any): Promise<boolean> {
      return await this.repo
        .remove(entity)
        .then(() => {
          return true;
        })
        .catch((ex) => {
          Logger.log(ex.message);
          return false;
        });
    }
    async deleteElements(entities: any[]): Promise<boolean> {
      return await this.repo
        .remove(entities)
        .then(() => {
          return true;
        })
        .catch((ex) => {
          Logger.log(ex.message);
          return false;
        });
    }
    async deleteElementById(id: string): Promise<boolean> {
      return await this.repo
        .delete(id)
        .then(() => {
          return true;
        })
        .catch((ex) => {
          Logger.log(ex.message);
          return false;
        });
    }
    async updateElement(entity: any): Promise<boolean> {
      return await this.repo
        .save(entity)
        .then(() => {
          return true;
        })
        .catch((ex) => {
          Logger.log(ex.message);
          return false;
        });
    }
    async updateElements(entities: any[]): Promise<boolean> {
      return await this.repo
        .save(entities)
        .then(() => {
          return true;
        })
        .catch((ex) => {
          Logger.log(ex.message);
          return false;
        });
    }
    getPage(numberPage: number): any {
      return true;
    }
    async getElementById(id: string): Promise<any> {
      const findOptions: FindOneOptions<T> = {
        where: {
          id: id,
        } as unknown as FindOptionsWhere<T>,
      };
      return await this.repo
        .findOne(findOptions)
        .then((value) => {
          if (!value) {
            throw new Error('Value is not exists!');
          }
          return value;
        })
        .catch((ex) => {
          Logger.log(ex.message);
        });
    }
    async getCountPage(): Promise<any> {
      return await this.repo
        .count()
        .then((value: number) => {
          return value;
        })
        .catch((ex) => {
          Logger.log(ex.message);
        });
    }
  }
  return CommonCrudServiceHost;
}
