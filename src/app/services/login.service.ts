import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class LoginService {

  private loginUrl = environment.urlApi.concat('/autenticar');

  constructor(private http: HttpClient, private router: Router, private sessionStorageService: SessionStorageService) {
  }

  login(login): Observable<any> {
    return this.http.post(this.loginUrl, login);
  }

  logout(): void {
    this.router.navigateByUrl('/').then( () => this.sessionStorageService.clear('usuario-logado')
    );
  }
}
