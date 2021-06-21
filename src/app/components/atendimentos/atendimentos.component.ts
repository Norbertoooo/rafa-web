import {Component, Input, OnInit} from '@angular/core';
import {AtendimentoService} from '../../shared/services/atendimento.service';
import {AlertaService} from '../../shared/services/alerta.service';
import {Terapeuta} from '../../models/terapeuta.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObservacaoModalComponent} from './observacao/observacao-modal.component';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.css']
})
export class AtendimentosComponent implements OnInit {

  @Input()
  terapeuta: Terapeuta;

  isCollapsed = true;
  paginaAtual = 1;
  tamanhoPagina = 10;
  totalItens: number;
  atendimentos = [];

  constructor(private atendimentoService: AtendimentoService,
              private ngbModal: NgbModal,
              private alertaService: AlertaService) {
  }

  ngOnInit(): void {
    this.listarAtendimentos();
  }

  listarAtendimentos(): void {
    this.atendimentoService.obterAtendimentosTerapeuta(this.paginaAtual, this.tamanhoPagina)
      .subscribe(resposta => {
        this.atendimentos = resposta;
        this.totalItens = this.atendimentos.length;
      }, error => {
        this.alertaService.exibirErro(error);
      });
  }

  exibirObservacao(atendimento): void {
    const modalRef = this.ngbModal.open(ObservacaoModalComponent);
    modalRef.componentInstance.atendimento = atendimento;
    modalRef.componentInstance.emitirConfirmacao.subscribe(resposta => {
      if (resposta) {
        this.listarAtendimentos();
      }
    });
  }
}
