import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { User } from './user.entity';

@ApiTags('Login') // Groups endpoints in Swagger
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @ApiOperation({ summary: 'Získat všechny uživatele' })
  @ApiResponse({ status: 200, description: 'Seznam uživatelů', type: [User] })
  findAll(): Promise<User[]> {
    return this.loginService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Vytvořit nového uživatele' })
  @ApiBody({
    schema: {
      example: {
        username: 'alice',
        password: 'secret',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Uživatel vytvořen', type: User })
  create(@Body('username') username: string, @Body('password') password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.loginService.create(user);
  }

  @Delete('deleteUser')
  @ApiOperation({ summary: 'Smazat uživatele' })
  @ApiBody({
    schema: {
      example: {
        username: 'alice',
        password: 'secret',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Uživatel smazán nebo nenalezen' })
  delete(@Body('username') username: string, @Body('password') password: string) {
    return this.loginService.delete(username, password);
  }
}

