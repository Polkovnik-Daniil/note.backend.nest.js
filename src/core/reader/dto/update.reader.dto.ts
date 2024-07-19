import { Book } from "@models/book";
import { CreateReaderDto } from "./create.reader.dto";

export class UpdateReaderDto extends CreateReaderDto {
  name: string;
  creationDate: Date;  
  books: Book[];
}
