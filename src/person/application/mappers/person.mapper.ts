import { Person } from '../../domain/entities/person.entity';
import { PersonTypeORM } from '../../infrastructure/persistence/typeorm/entities/person.typeorm';

export class PersonMapper {
  public static toTypeORM(person: Person): PersonTypeORM {
    const personTypeORM: PersonTypeORM = new PersonTypeORM();
    personTypeORM.name = person.getName();
    personTypeORM.lastName = person.getLastName();
    personTypeORM.dni = person.getDni();
    return personTypeORM;
  }
}