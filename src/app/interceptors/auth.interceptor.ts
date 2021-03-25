import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const usuarioLogado = this.sessionStorageService.retrieve('usuario-logado');
    if (usuarioLogado && usuarioLogado.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuarioLogado.token}`
        }
      });
    }
    return next.handle(request);
  }
}
