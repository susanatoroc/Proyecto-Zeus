import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Notificaciones} from '../models';
import {NotificacionesRepository} from '../repositories';

export class NotificacionesController {
  constructor(
    @repository(NotificacionesRepository)
    public notificacionesRepository: NotificacionesRepository,
  ) { }

  @post('/notificaciones')
  @response(200, {
    description: 'Notificaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    notificaciones: Omit<Notificaciones, 'id'>,
  ): Promise<Notificaciones> {
    this.enviarSMS(notificaciones.mensaje);
    return this.notificacionesRepository.create(notificaciones);
  }

  @get('/notificaciones/count')
  @response(200, {
    description: 'Notificaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Notificaciones) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.notificacionesRepository.count(where);
  }

  @get('/notificaciones')
  @response(200, {
    description: 'Array of Notificaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notificaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Notificaciones) filter?: Filter<Notificaciones>,
  ): Promise<Notificaciones[]> {
    return this.notificacionesRepository.find(filter);
  }

  @patch('/notificaciones')
  @response(200, {
    description: 'Notificaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Notificaciones,
    @param.where(Notificaciones) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.notificacionesRepository.updateAll(notificaciones, where);
  }

  @get('/notificaciones/{id}')
  @response(200, {
    description: 'Notificaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Notificaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Notificaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Notificaciones>
  ): Promise<Notificaciones> {
    return this.notificacionesRepository.findById(id, filter);
  }

  @patch('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Notificaciones,
  ): Promise<void> {
    await this.notificacionesRepository.updateById(id, notificaciones);
  }

  @put('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notificaciones: Notificaciones,
  ): Promise<void> {
    await this.notificacionesRepository.replaceById(id, notificaciones);
  }

  @del('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notificacionesRepository.deleteById(id);
  }

  enviarSMS(mensaje: any) {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = 'AC58733f2c362a9cdba067802e0f315e0e';
    const authToken = '40cd8051a5bb49cbe0a0522c1c8de214';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: mensaje,
        from: '+18658306441',
        to: '+573203332658',
      })
      .then((message: any) => console.log(message.sid));
  }
}
