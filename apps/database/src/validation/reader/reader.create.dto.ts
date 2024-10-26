import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';

export default class ReaderCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My recipes',
    description: 'Topic',
    required: true,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Delicious food recipes',
    description: 'Description of recipes',
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Recipe: ....',
    description: 'Content',
    required: false,
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: 'Determines whether this note is public or not',
    required: true,
  })
  isPublic: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: '7dbf01e5-21d3-47b5-a5bc-d4b0a4bb4c9c',
    description: 'This is user`s id',
    required: true,
  })
  userId: string;
}
