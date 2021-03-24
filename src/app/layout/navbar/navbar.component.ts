import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService, private router: Router) {
  }

  ngOnInit(): void {
  }

  estaLogado(): boolean {
    const usuarioLogado = this.sessionStorageService.retrieve('usuario-logado');
    return usuarioLogado === null;
  }

  logout(): void {
    this.router.navigateByUrl('/').finally(() => this.sessionStorageService.clear('usuario-logado')
    );
  }
}
