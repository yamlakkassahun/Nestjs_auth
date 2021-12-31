import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/user.schema';
import { AuthService } from './auth.service';
import { AuthCredentialDto, AuthCredentialPasswordDto, AuthCredentialSignInDto } from './dto/auth.dto';
import { GetUser } from './getUser/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseGuards(AuthGuard())
  async signup(@Body() authCredentialDto: AuthCredentialDto) {
    return await this.authService.SignUp(authCredentialDto);
  }

  @Post('/signin')
  async signin(@Body() authCredentialSignInDto: AuthCredentialSignInDto) {
    return await this.authService.SignIn(authCredentialSignInDto);
  }

  @Get('/user')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return req.user;
  }

  @Get('/all')
  @UseGuards(AuthGuard())
  async allAdmins(): Promise<User[]> {
    return this.authService.AllAdmins();
  }

  @Delete(':/id')
  @UseGuards(AuthGuard())
  async removeAdmin(@Param('id') id: string): Promise<any> {
    return this.authService.RemoveAdmin(id);
  }


  @Patch('/password')
  @UseGuards(AuthGuard())
  async changePassword(@GetUser() user: User, @Body() authCredentialPasswordDto: AuthCredentialPasswordDto ): Promise<any> {
    return this.authService.PasswordUpdate(user, authCredentialPasswordDto);
  }
}
