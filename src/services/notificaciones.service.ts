import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PersonaRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(@repository(PersonaRepository)
  public personaRepository: PersonaRepository,
  ) { }


  enviarSMS(clave: any, telefono: string) {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = 'AC58733f2c362a9cdba067802e0f315e0e';
    const authToken = '40cd8051a5bb49cbe0a0522c1c8de214';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: "Tu clave es: " + clave,
        from: '+18658306441',
        to: telefono,
      })
      .then((message: any) => console.log(message.sid));
  }


}
