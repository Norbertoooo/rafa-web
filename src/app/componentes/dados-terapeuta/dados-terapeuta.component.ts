import {Component, OnInit} from '@angular/core';
import {TerapeutaService} from '../../shared/services/terapeuta.service';
import {Terapeuta} from '../../models/terapeuta.model';

@Component({
  selector: 'app-dados-terapeuta',
  templateUrl: './dados-terapeuta.component.html',
  styleUrls: ['./dados-terapeuta.component.css']
})
export class DadosTerapeutaComponent implements OnInit {

  terapeuta = new Terapeuta();
  estaBloqueado = true;
  isCollapsed = true;

  constructor(private terapeutaService: TerapeutaService) {
  }

  ngOnInit(): void {
    this.terapeutaService.buscarDadosTerapeuta().subscribe(resposta => this.terapeuta = resposta);
  }

  editarTerapeuta(): void {
    this.estaBloqueado === true ? this.estaBloqueado = false: this.estaBloqueado = true;

  }

  salvarAlteracoes(): void {

  }
}
