import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import ReaderCreateDto from './reader.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class ReaderUpdateDto extends ReaderCreateDto {
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
