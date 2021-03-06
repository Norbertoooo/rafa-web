import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private relatorioUrl = environment.urlApi.concat('/relatorios');

  constructor(private http: HttpClient) {
  }

  buscarRelatorio(pacienteId: number): Observable<any> {
    return this.http.get(this.relatorioUrl.concat('/' + pacienteId), {responseType: 'blob'});
  }
}
