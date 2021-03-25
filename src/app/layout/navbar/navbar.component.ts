import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogado: any;
  constructor(private sessionStorageService: SessionStorageService, private router: Router, private loginService: LoginService ) {
  }

  ngOnInit(): void {
  }

  estaLogado(): boolean {
    this.usuarioLogado = this.sessionStorageService.retrieve('usuario-logado');
    return this.usuarioLogado === null;
  }

  navegarParaDashboard(): void {
    if (this.usuarioLogado.perfil === 'TERAPEUTA') {
      this.router.navigateByUrl('/dashboard-terapeuta').then();
    }
  }

  logout(): void {
    this.loginService.logout();
  }
}