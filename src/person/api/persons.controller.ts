import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { PersonApplicationService } from '../application/services/person-application.service';
import { RegisterPersonRequest } from '../application/dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-person-response.dto';
import { GetPersonsQuery } from '../application/queries/get-persons.query';

@Controller('persons')
export class PersonsController {
  constructor(
    private readonly personApplicationService: PersonApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/')
  async registerPerson(
    @Body() registerPersonRequest: RegisterPersonRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPersonResponse> = await this.personApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getPersons(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const persons = await this.queryBus.execute(new GetPersonsQuery());
      return ApiController.ok(response, persons);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
