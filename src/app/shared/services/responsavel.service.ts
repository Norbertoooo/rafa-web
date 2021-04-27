import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  private responsavelUrl = environment.urlApi.concat('/responsaveis');

  constructor(private http: HttpClient) {
  }

  buscarDadosResponsavel(): Observable<any> {
    return this.http.get(this.responsavelUrl);
  }

  atualizarResponsavel(responsavel): Observable<any> {
    return this.http.put(this.responsavelUrl, responsavel);
  }
}
