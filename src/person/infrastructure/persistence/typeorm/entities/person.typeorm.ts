import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('person')
export class PersonTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column({ length: 200 })
  public name: string;

  @Column({ length: 200 })
  public lastName: string;

  @Column({ length: 11 })
  public dni: string;
}
