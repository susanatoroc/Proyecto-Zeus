import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
var generatePassword = require('password-generator');
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(ClienteRepository)
  public clienteRepository: ClienteRepository,
  ) { }

  /*
   * Add service methods here
   */

  generarClaveAleatorio = (): string => {

    let claveGenerada = generatePassword(12, false); //Genero Clave de 12 caracteres
    return claveGenerada;
  };

  cifrarClave = (clave: string): string => {

    return CryptoJS.MD5(clave).toString();
  };

  identificarPersona = (usuario: string, clave: string) => {

    try {
      let p = this.clienteRepository.findOne({where: {username: usuario, clave: clave}})
      if (p) {
        return p;
      }
      return false;
    }

    catch {

      return false;
    }

  };

  GenerarTokenJWT(Cliente: Cliente) {
    let token = jwt.sign({
      data: {
        id: Cliente.id,
        username: Cliente.username
      },

    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {

    try {

      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    }

    catch {
      return false;
    }
  }
}
