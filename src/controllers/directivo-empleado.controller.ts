import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Directivo,
  Empleado,
} from '../models';
import {DirectivoRepository} from '../repositories';

export class DirectivoEmpleadoController {
  constructor(
    @repository(DirectivoRepository) protected directivoRepository: DirectivoRepository,
  ) { }

  @get('/directivos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Directivo has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.directivoRepository.empleados(id).find(filter);
  }

  @post('/directivos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Directivo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Directivo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInDirectivo',
            exclude: ['id'],
            optional: ['directivoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.directivoRepository.empleados(id).create(empleado);
  }

  @patch('/directivos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Directivo.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.directivoRepository.empleados(id).patch(empleado, where);
  }

  @del('/directivos/{id}/empleados', {
    responses: {
      '200': {
        description: 'Directivo.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.directivoRepository.empleados(id).delete(where);
  }
}
