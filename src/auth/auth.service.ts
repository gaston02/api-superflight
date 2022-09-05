import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.userPassword,
    );
    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { acces_token: this.jwtService.sign(payload) };
  }

  async signUp(payload: UserDTO) {
    return this.userService.createUser(payload);
  }
}
