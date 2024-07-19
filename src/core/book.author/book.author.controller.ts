import { Controller, Delete, Get, Logger, Post, Put } from '@nestjs/common';

import { BookAuthorService } from './book.author.service';
import { ICrud } from 'src/common/interfaces';
import { CreateBookAuthorDto, UpdateBookAuthorDto } from './dto';

@Controller('book.authors')
export class BookAuthorController implements ICrud {
  constructor(private readonly service: BookAuthorService) {
  }
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
  async createElement(dto: CreateBookAuthorDto): Promise<boolean> {
    // convert dto to entity
    return await this.service.createElement(dto);
  }
  @Post('/')
  async createElements(dtos: CreateBookAuthorDto[]): Promise<boolean> {
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
  updateElement(dto: UpdateBookAuthorDto): boolean {
    // convert dto to entity
    return this.service.updateElement(dto);
  }
  @Put('/')
  updateElements(dtos: UpdateBookAuthorDto[]): boolean {
    // convert dto to entity
    return this.service.updateElement(dtos);
  }
}
