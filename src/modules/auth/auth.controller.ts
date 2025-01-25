import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/utils/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    console.log('git oauth');
    // Apenas redireciona para o GitHub
  }

  @Public()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async gitHubCallback(@Req() req, @Res() res: any) {
    console.log('git callback', req.user);
    const { access_token } = await this.authService.gitHubCallback(req.user);

    res.redirect(
      `http://localhost:3000/git-hub-callback?token=${access_token}`,
    );
  }
}
