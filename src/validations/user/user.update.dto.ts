import { IsString, IsUUID } from 'class-validator';
import UserCreateDto from './user.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export default class UserUpdateDto extends UserCreateDto {
  @IsUUID()
  @IsString()
  @ApiProperty({
    example: '7dbf01e5-21d3-47b5-a5bc-d4b0a4bb4c9c',
    description: "User's Id",
    required: false,
  })
  id: string;
}
