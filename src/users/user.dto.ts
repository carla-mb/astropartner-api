import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  userId?: string; 

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthDate: string | Date;

  @ApiProperty()
  zodiacSign: string;
}
