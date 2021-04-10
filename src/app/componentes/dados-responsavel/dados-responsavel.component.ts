import {Component, OnInit} from '@angular/core';
import {Responsavel} from '../../models/responsavel.model';
import {ResponsavelService} from '../../shared/services/responsavel.service';
import {AlertaService} from '../../shared/services/alerta.service';

@Component({
  selector: 'app-dados-responsavel',
  templateUrl: './dados-responsavel.component.html',
  styleUrls: ['./dados-responsavel.component.css']
})
export class DadosResponsavelComponent implements OnInit {

  estaBloqueado = true;
  isCollapsed = false;
  responsavel: Responsavel = {};

  constructor(private responsavelService: ResponsavelService, private alertService: AlertaService) {
  }

  ngOnInit(): void {
    this.responsavelService.buscarDadosResponsavel().subscribe((resposta) => {
      this.responsavel = resposta;
    }, (error) => {
      this.alertService.exibirErro(error.error.mensagem);
    });
  }

}
