import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { PersonTypeORM } from '../../infrastructure/persistence/typeorm/entities/person.typeorm';
import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';

@Injectable()
export class RegisterPersonValidator {
  constructor(
    @InjectRepository(PersonTypeORM)
    private personRepository: Repository<PersonTypeORM>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterPersonRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerPersonRequest.name;
    if (!name.length) {
      notification.addError('name is required', null);
    }
    const lastName: string = registerPersonRequest.lastName;
    if (!lastName.length) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPersonRequest.dni;
    if (!dni.length) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}