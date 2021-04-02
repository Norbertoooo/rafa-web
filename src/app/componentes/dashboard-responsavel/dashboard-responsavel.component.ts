import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Paciente} from '../../models/paciente.model';
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {RelatorioService} from '../../services/relatorio.service';

@Component({
  selector: 'app-dashboard-responsavel',
  templateUrl: './dashboard-responsavel.component.html',
  styleUrls: ['./dashboard-responsavel.component.css']
})
export class DashboardResponsavelComponent implements OnInit {

  isCollapsed = false;
  filtro = new FormControl('');
  pacientes: Paciente[] = [];
  paginaAtual = 1;
  tamanhoPagina = 5;
  totalItens: any;

  constructor(private spinnerService: NgxSpinnerService, private relatorioService: RelatorioService) { }

  ngOnInit(): void {
  }

  emitirRelatorio(): void {
    this.spinnerService.show();
    this.relatorioService.buscarRelatorio().subscribe(resposta => {
      this.exibirArquivo(resposta);
      this.spinnerService.hide();
    });
  }

  exibirArquivo(data: any): void {
    const blob = new Blob([data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
