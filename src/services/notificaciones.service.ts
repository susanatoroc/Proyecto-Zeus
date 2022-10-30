import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ClienteRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(@repository(ClienteRepository)
  public clienteRepository: ClienteRepository,
  ) { }


  enviarSMS(clave: any, telefono: string) {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = 'AC58733f2c362a9cdba067802e0f315e0e';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);
    console.log("El telefono es: ", telefono);
    client.messages
      .create({
        body: "Tu clave es: " + clave,
        from: '+18658306441',
        to: telefono,
      })
      .then((message: any) => console.log(message.sid));
  }


  enviarCorreo(clave: any, correo: string) {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'dianaiselaospina@gmail.com', // Change to your recipient
      from: correo, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: "La clave es" + clave,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })


  }

}
