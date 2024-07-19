import { Controller } from '@nestjs/common';
import { Delete, Get, Logger, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { ICrud } from 'src/common/interfaces';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto';

@Controller('books')
export class BookController implements ICrud {
  constructor(private readonly service: BookService) {}
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
  async createElement(dto: CreateBookDto): Promise<boolean> {
    // convert dto to entity
    return await this.service.createElement(dto);
  }
  @Post('/')
  async createElements(dtos: CreateBookDto[]): Promise<boolean> {
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
  updateElement(dto: UpdateBookDto): boolean {
    // convert dto to entity
    return this.service.updateElement(dto);
  }
  @Put('/')
  updateElements(dtos: UpdateBookDto[]): boolean {
    // convert dto to entity
    return this.service.updateElement(dtos);
  }
}
