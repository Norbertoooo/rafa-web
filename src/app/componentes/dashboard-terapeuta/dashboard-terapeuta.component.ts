import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Paciente} from '../../models/paciente.model';
import {AlertService} from '../../services/alert.service';
import {PacienteService} from '../../services/paciente.service';
import {HttpErrorResponse} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

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
  total$: any;
  service: any;
  private collectionSize: any;

  constructor(private pacienteService: PacienteService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.pacienteService.buscarPacientesDeUmTerapeuta().subscribe((resposta) => {
      this.pacientes = resposta.content;
      this.collectionSize = this.pacientes.length;
      this.pacientes$ = of(this.pacientes);
    }, (error: HttpErrorResponse) => {
      this.alertService.exibirErro(error.error.mensagem);
    });

    this.filtro.valueChanges.pipe(
      startWith(''),
      map(text => this.pacientes$ = this.procurar(text))
    );
  }

  onSort($event: any): void {
  }

  procurar(text: string): Observable<Paciente[]> {
    return of(this.pacientes.filter(paciente => {
      const term = text.toLowerCase();
      return paciente.nomeCompleto.toLowerCase().includes(term);
    }));
  }

  search(value: string): void {
    this.pacientes = this.pacientes.filter((val) => val.nomeCompleto.toLowerCase().includes(value));
    this.collectionSize = this.pacientes.length;
  }

  adicionarPaciente(): void {

  }
}
