import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Persona } from './persona.model';
import {Empresa} from './empresa.model';

@model({settings: {strict: false}})
export class Empleado extends Persona {
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
  Sueldo_bruto: number;

  @property({
    type: 'string',
  })
  directivoId?: string;

  @belongsTo(() => Empresa)
  empresaId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
