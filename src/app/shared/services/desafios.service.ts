import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DesafiosService {

  private desafioUrl = environment.urlApi.concat('/desafios');

  constructor(private http: HttpClient) {
  }

  obterDesafios(pagina: number, tamanho: number): Observable<any> {
    return this.http.get(this.desafioUrl.concat('/' + pagina + '/' + tamanho));
  }

  cadastrarDesafio(desafio: any): Observable<any> {
    return this.http.post(this.desafioUrl, desafio);
  }

  atualizarDesafio(id: number, desafio: any): Observable<any> {
    return this.http.put(this.desafioUrl.concat('/' + id), desafio);
  }

  deletarDesafio(id: number): Observable<any> {
    return this.http.delete(this.desafioUrl.concat('/' + id));
  }

}
