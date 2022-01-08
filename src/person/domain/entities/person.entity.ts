import { AggregateRoot } from '@nestjs/cqrs';
import { PersonRegistered } from '../events/person-registered.event';

export class Person extends AggregateRoot {
  protected id: number;
  protected name: string;
  protected lastName: string;
  protected dni: string;

  public constructor(
    name: string, 
    lastName: string,
    dni: string
  ) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.dni = dni;
  }
  
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getDni(): string {
    return this.dni;
  }

  public changeId(id: number) {
    this.id = id;
  }
 
  public register() {
    const event = new PersonRegistered(this.name, this.lastName, this.dni);
    this.apply(event);
  }
}
