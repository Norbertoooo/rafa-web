import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AtendimentoService {

  private atendimentoUrl = environment.urlApi.concat('/atendimentos');

  constructor(private http: HttpClient) {
  }

  obterAtendimentosTerapeuta(pagina: number, tamanho: number): Observable<any> {
    return this.http.get(this.atendimentoUrl.concat('/terapeuta/1'));
  }

  editarObservacao(atendimentoId: number, atendimento): Observable<any> {
    return this.http.patch(this.atendimentoUrl.concat('/' + atendimentoId), atendimento);
  }

}
