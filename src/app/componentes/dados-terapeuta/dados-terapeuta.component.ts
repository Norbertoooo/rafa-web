import {Component, OnInit} from '@angular/core';
import {TerapeutaService} from '../../service/terapeuta.service';
import {Terapeuta} from '../../model/terapeuta.model';

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

  }

  salvarAlteracoes(): void {

  }
}
