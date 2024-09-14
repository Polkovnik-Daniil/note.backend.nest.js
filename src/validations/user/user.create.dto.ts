import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export default class UserCreateDto {
  @IsString()
  @ApiProperty({
    example: 'Alex',
    description: 'The new first name of the user',
    required: true,
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Camino',
    description: 'The new surname name of the user',
    required: true,
  })
  surnameName: string;

  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'alex@prisma.io',
    description: "The User's email",
    required: true,
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '1',
    description: "The user's password",
    required: true,
  })
  hashPasssword: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is the account activated?',
    required: true,
  })
  isActivated: boolean;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Is the mail confirmed?',
    required: true,
  })
  isEmailVerified: boolean;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    example: 'USER',
    enum: Role,
    required: false,
    description: 'The role of the user',
  })
  role?: Role;
}
