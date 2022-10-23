import {hasMany, model, property} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model({settings: {strict: false}})
export class Directivo extends Empleado {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Categoria: number;

  @hasMany(() => Empleado)
  empleados: Empleado[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
