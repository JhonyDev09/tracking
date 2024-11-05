import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  @Redirect('/datos', 302)
  redirectToDatos() {}
}