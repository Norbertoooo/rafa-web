import {Endereco} from './endereco.model';
import {Login} from '../componentes/login/login.model';
import {Paciente} from './paciente.model';

export interface Responsavel {
  id?: number;
  nomeCompleto?: string;
  dataNascimento?: string;
  parentesco?: string;
  telefone?: number;
  cpf?: string;
  protegidos?: Paciente[];
  login?: Login;
  endereco?: Endereco;
}
