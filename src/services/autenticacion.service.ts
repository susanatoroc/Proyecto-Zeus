import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ClienteRepository} from '../repositories';
var generatePassword = require('password-generator');
var CryptoJS = require("crypto-js");

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
}
