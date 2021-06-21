import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AtendimentoService} from '../../../shared/services/atendimento.service';
import {AlertaService} from '../../../shared/services/alerta.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-observacao',
  templateUrl: './observacao-modal.component.html',
})
export class ObservacaoModalComponent implements OnInit {

  @Input() atendimento: any;

  @Output() emitirConfirmacao = new EventEmitter();

  bloqueado = true;
  observacao: string;

  constructor(private ngbActiveModal: NgbActiveModal,
              private atendimentoService: AtendimentoService,
              private spinnerService: NgxSpinnerService,
              private alertaService: AlertaService) {
  }

  ngOnInit(): void {
    this.observacao = this.atendimento.observacao;
  }

  editar(): void {
    this.spinnerService.show();
    this.atendimentoService.editarObservacao(this.atendimento.id, {
      observacao: this.observacao
    }).subscribe(resposta => {
      this.emitirConfirmacao.emit(true);
      this.spinnerService.hide();
      this.alertaService.exibirSucesso('Observação editada com sucesso!');
      this.cancelar();
    }, error => {
      this.spinnerService.hide();
      this.alertaService.exibirErro(error);
    });
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }
}
