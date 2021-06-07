import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Paciente} from '../../models/paciente.model';
import {FormControl} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {RelatorioService} from '../../shared/services/relatorio.service';
import {PacienteService} from '../../shared/services/paciente.service';
import {AlertaService} from '../../shared/services/alerta.service';
import {HttpErrorResponse} from '@angular/common/http';

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
  totalItens: number;

  constructor(private spinnerService: NgxSpinnerService, private relatorioService: RelatorioService,
              private pacienteService: PacienteService, private alertService: AlertaService) { }

  ngOnInit(): void {
    this.pacienteService.buscarPacientesDeUmResponsavel().subscribe( (resposta) => {
      this.pacientes = resposta;
      this.totalItens = this.pacientes.length;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.alertService.exibirErro(error.error);
    });
  }

  emitirRelatorio(pacienteId: number): void {
    this.spinnerService.show();
    this.relatorioService.buscarRelatorio(pacienteId).subscribe(resposta => {
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
