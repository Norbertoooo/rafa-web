import {Component, OnInit} from '@angular/core';
import {Login} from './login.model';
import {LoginService} from '../../shared/services/login.service';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AlertaService} from '../../shared/services/alerta.service';
import {ErroModel} from '../../models/erro.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login();

  constructor(private loginService: LoginService, private router: Router, private spinnerService: NgxSpinnerService,
              private sessionStorageService: SessionStorageService, private alertService: AlertaService) {
  }

  ngOnInit(): void {
  }

  efetuarLogin(): void {
    this.spinnerService.show();
    this.loginService.login(this.login).subscribe((resposta) => {
      console.log(resposta);
      this.sessionStorageService.store('usuario-logado', resposta);
      if (resposta.perfil === 'TERAPEUTA') {
        this.router.navigateByUrl('/dashboard-terapeuta').then();
      }
      if (resposta.perfil === 'RESPONSAVEL') {
        this.router.navigateByUrl('/dashboard-responsavel').then();
      }
      this.spinnerService.hide();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.spinnerService.hide();
      this.alertService.exibirErro(error.message);
    });
  }
}
