import { Controller, Delete, Get, Logger, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { ICrud } from 'src/common/interfaces';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController implements ICrud {
  constructor(private readonly service: UserService) {}
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
  async createElement(dto: CreateUserDto): Promise<boolean> {
    // convert dto to entity
    return await this.service.createElement(dto);
  }
  @Post('/')
  async createElements(dtos: CreateUserDto[]): Promise<boolean> {
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
  updateElement(dto: UpdateUserDto): boolean {
    // convert dto to entity
    return this.service.updateElement(dto);
  }
  @Put('/')
  updateElements(dtos: UpdateUserDto[]): boolean {
    // convert dto to entity
    return this.service.updateElement(dtos);
  }
}
