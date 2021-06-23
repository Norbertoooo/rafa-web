import {Paciente} from './paciente.model';
import {Terapeuta} from './terapeuta.model';

export interface Atendimento {
  id?: number;
  paciente?: Paciente;
  terapeuta?: Terapeuta;
  dataHora?: string;
  scoreGlobal?: number;
  observacao?: string;
}
