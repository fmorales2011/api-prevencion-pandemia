import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { AppSettings } from '../../../common/application/app-settings';
import { RegisterPerson } from '../commands/register-person.command';
import { RegisterPersonValidator } from '../validators/register-person.validator';
import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-person-response.dto';

@Injectable()
export class PersonApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPersonValidator: RegisterPersonValidator,
  ) {}

  async register(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<Result<AppNotification, RegisterPersonResponse>> {
    const notification: AppNotification = await this.registerPersonValidator.validate(registerPersonRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerPerson: RegisterPerson = new RegisterPerson(
      registerPersonRequest.name,
      registerPersonRequest.lastName,
      registerPersonRequest.dni
    );
    const idPerson = await this.commandBus.execute(registerPerson);
    const registerPersonResponse: RegisterPersonResponse = new RegisterPersonResponse(
      idPerson,
      registerPersonRequest.name,
      registerPersonRequest.lastName,
      registerPersonRequest.dni
    );
    return Result.ok(registerPersonResponse);
  }
}