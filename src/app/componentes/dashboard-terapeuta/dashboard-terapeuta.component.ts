import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Paciente} from '../../models/paciente.model';
import {AlertService} from '../../services/alert.service';
import {PacienteService} from '../../services/paciente.service';
import {HttpErrorResponse} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdicionarPacienteModalComponent} from './adicionar-paciente-modal/adicionar-paciente-modal.component';
import {RelatorioService} from '../../services/relatorio.service';

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

  constructor(private pacienteService: PacienteService, private alertService: AlertService,
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
    const modalRef = this.ngbModalService.open(AdicionarPacienteModalComponent);
  }

  emitirRelatorio(): void{
    this.relatorioService.buscarRelatorio().subscribe(resposta => this.exibirArquivo(resposta));
  }

  exibirArquivo(data: any): void{
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
