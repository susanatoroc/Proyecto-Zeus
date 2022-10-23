import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Orden extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
  })
  empresaId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Orden>) {
    super(data);
  }
}

export interface OrdenRelations {
  // describe navigational properties here
}

export type OrdenWithRelations = Orden & OrdenRelations;
