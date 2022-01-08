import { Person } from '../entities/person.entity';

export class PersonFactory {
  public static createFrom(
    name: string,
    lastName: string,
    dni: string
  ): Person {
    return new Person(name, lastName, dni);
  }
}