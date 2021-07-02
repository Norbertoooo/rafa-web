import {Login} from '../components/login/login.model';
import {Endereco} from './endereco.model';

export class Terapeuta {
  constructor(
    public id?: number,
    public nomeCompleto?: string,
    public dataNascimento?: string,
    public cpf?: string,
    public crfa?: number,
    public formacao?: string,
    public especialidade?: string,
    public telefone?: number,
    public endereco = new Endereco(),
    public login = new Login()
  ) {
  }
}
