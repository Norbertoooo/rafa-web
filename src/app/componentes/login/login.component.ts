import {Component, OnInit} from '@angular/core';
import {Login} from './login.model';
import {LoginService} from '../../service/login.service';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();

  constructor(private loginService: LoginService, private router: Router,
              private sessionStorageService: SessionStorageService, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  efetuarLogin(): void {
    this.loginService.login(this.login).subscribe((resposta) => {
      console.log(resposta);
      this.sessionStorageService.store('usuario-logado', resposta);
      if (resposta.perfil === 'TERAPEUTA') {
        this.router.navigateByUrl('/dashboard-terapeuta').then();
      }
      if (resposta.perfil === 'RESPONSAVEL') {
        this.router.navigateByUrl('/dashboard-responsavel').then();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.alertService.exibirErro(error.error.mensagem);
    });
  }
}
