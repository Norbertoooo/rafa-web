import {Responsavel} from './responsavel.model';

export interface Paciente {
  id?: number;
  nomeCompleto?: string;
  dataNascimento?: string;
  idFicha?: number;
  responsaveis?: Responsavel[];
}
