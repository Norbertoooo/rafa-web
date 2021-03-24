import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {

  private loginUrl = environment.urlApi.concat('/autenticar');

  constructor(private http: HttpClient) {
  }

  login(login): Observable<any> {
    return this.http.post(this.loginUrl, login);
  }
}
