import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PacienteService {

  private pacienteUrl = environment.urlApi.concat('/pacientes');

  constructor(private http: HttpClient) {
  }

  buscarPacientesDeUmTerapeuta(): Observable<any> {
    return this.http.get(this.pacienteUrl.concat('/terapeuta'));
  }

  adicionarPaciente(paciente): Observable<any> {
    return this.http.post(this.pacienteUrl, paciente);
  }
}
