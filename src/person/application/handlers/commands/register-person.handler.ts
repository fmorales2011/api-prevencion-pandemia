import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterPerson } from 'src/person/application/commands/register-person.command';
import { PersonMapper } from '../../mappers/person.mapper';
import { PersonFactory } from '../../../domain/factories/person.factory';
import { PersonTypeORM } from '../../../infrastructure/persistence/typeorm/entities/person.typeorm';
import { Person } from 'src/person/domain/entities/person.entity';

@CommandHandler(RegisterPerson)
export class RegisterPersonHandler
  implements ICommandHandler<RegisterPerson> {
  constructor(
    @InjectRepository(PersonTypeORM)
    private personRepository: Repository<PersonTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterPerson) {
    let idPerson: number = 0;
    let person: Person = PersonFactory.createFrom(
      command.name, 
      command.lastName, 
      command.dni
    );
    let personTypeORM: PersonTypeORM = PersonMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return idPerson;
    }
    idPerson = Number(personTypeORM.id);
    person.changeId(idPerson);
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return idPerson;
  }
}