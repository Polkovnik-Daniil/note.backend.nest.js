import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MessageEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'alex@example.com',
    description: 'The recipient of the letter',
    required: true,
  })
  to: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Subject',
    description: 'The subject of the letter',
    required: true,
  })
  subject: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Helloy world!',
    description: 'The message of the letter',
    required: true,
  })
  text: string;
}
