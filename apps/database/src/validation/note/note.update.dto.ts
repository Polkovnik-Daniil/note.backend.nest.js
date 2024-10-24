import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import NoteCreateDto from './note.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class NoteUpdateDto extends NoteCreateDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '7dbf01e5-21d3-47b5-a5bc-d4b0a4bb4c9c',
    description: "Note's Id",
    required: false,
  })
  id: string;
}
