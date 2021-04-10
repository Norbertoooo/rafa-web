import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastrarTerapeutaService {

  private cadastrarTerapeutaUrl = environment.urlApi.concat('/terapeutas');

  constructor(private http: HttpClient) {
  }

  cadastrarTerapeuta(terapeuta): Observable<any> {
    return this.http.post(this.cadastrarTerapeutaUrl, terapeuta);
  }
}
