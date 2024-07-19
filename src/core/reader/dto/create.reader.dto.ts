import { Book } from "@models/book";

export class CreateReaderDto {
  name: string;
  creationDate: Date;  
  books: Book[];
}
