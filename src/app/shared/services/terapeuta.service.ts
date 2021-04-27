import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class TerapeutaService {

  private terapeutaUrl = environment.urlApi.concat('/terapeutas');

  constructor(private http: HttpClient) {
  }

  buscarDadosTerapeuta(): Observable<any> {
    return this.http.get(this.terapeutaUrl);
  }

  atualizarTerapeuta(terapeuta): Observable<any> {
    return this.http.put(this.terapeutaUrl, terapeuta);
  }

}
