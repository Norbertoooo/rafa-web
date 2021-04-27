import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Paciente} from '../../models/paciente.model';
import {AlertaService} from '../../shared/services/alerta.service';
import {PacienteService} from '../../shared/services/paciente.service';
import {HttpErrorResponse} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdicionarPacienteModalComponent} from './adicionar-paciente-modal/adicionar-paciente-modal.component';
import {RelatorioService} from '../../shared/services/relatorio.service';
import {VisualizarResponsavelModalComponent} from './visualizar-responsavel-modal/visualizar-responsavel-modal.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-terapeuta',
  templateUrl: './dashboard-terapeuta.component.html',
  styleUrls: ['./dashboard-terapeuta.component.css']
})
export class DashboardTerapeutaComponent implements OnInit {

  isCollapsed = false;
  pacientes$: Observable<Paciente[]>;
  filtro = new FormControl('');
  pacientes: Paciente[] = [];
  paginaAtual = 1;
  tamanhoPagina = 5;
  totalItens: any;

  constructor(private pacienteService: PacienteService, private alertService: AlertaService, private spinnerService: NgxSpinnerService,
              private ngbModalService: NgbModal, private relatorioService: RelatorioService) {
  }

  ngOnInit(): void {
    this.buscarPacientes();

    this.filtro.valueChanges.pipe(
      startWith(''),
      map(text => this.pacientes$ = this.procurar(text))
    );
  }

  buscarPacientes(): void {
    this.pacienteService.buscarPacientesDeUmTerapeuta().subscribe((resposta) => {
      this.pacientes = resposta;
      this.totalItens = this.pacientes.length;
      this.pacientes$ = of(this.pacientes);
    }, (error: HttpErrorResponse) => {
      this.alertService.exibirErro(error.error.mensagem);
    });
  }

  procurar(text: string): Observable<Paciente[]> {
    return of(this.pacientes.filter(paciente => {
      const term = text.toLowerCase();
      return paciente.nomeCompleto.toLowerCase().includes(term);
    }));
  }

  adicionarPaciente(): void {
    const modalRef = this.ngbModalService.open(AdicionarPacienteModalComponent, {size: 'lg'});
    modalRef.componentInstance.sucesso.subscribe( (resposta) => {
      if (resposta) {
        this.buscarPacientes();
      }
    });
  }

  visualizarResponsavel(paciente): void {
    const modalRef = this.ngbModalService.open(VisualizarResponsavelModalComponent, {size: 'lg'});
    modalRef.componentInstance.pacienteId = paciente.id;
    modalRef.componentInstance.responsaveis = paciente.responsaveis;
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
