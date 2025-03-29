import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserMapper {
  // Convert a UserEntity to a UserDto
  entityToDto(userEntity: UserEntity): UserDto {
    return {
      userId: userEntity.userId,
      username: userEntity.username,
      password: userEntity.password,
      birthDate: userEntity.birthDate,
      zodiacSign: userEntity.zodiacSign,
    };
  }

  // Convert a UserDto to a UserEntity
  dtoToEntity(userDto: UserDto): UserEntity {
    const user = new UserEntity();
    user.username = userDto.username;
    user.password = userDto.password;
    
    if (typeof userDto.birthDate === 'string') {
      user.birthDate = new Date(userDto.birthDate); 
    } else {
      user.birthDate = userDto.birthDate; 
    }

    user.zodiacSign = userDto.zodiacSign;
    return user;
  }
}