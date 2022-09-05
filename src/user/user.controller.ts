import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() payload: UserDTO) {
    return this.userService.createUser(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Users' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Find one User' })
  findUser(@Param('userId') userId: string) {
    return this.userService.findUser(userId);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update User' })
  updateUser(@Param('userId') userId: string, @Body() payload: UserDTO) {
    return this.userService.updateUser(userId, payload);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete User' })
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
