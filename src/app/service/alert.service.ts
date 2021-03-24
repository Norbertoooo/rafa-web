import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from '../componentes/alert/alert.component';

@Injectable()
export class AlertService {

  constructor(private ngbModal: NgbModal) {
  }

  private exibirAlerta(mensagem: string, tipo: string): void {
    const time = 3000;
    const modalref = this.ngbModal.open(AlertComponent);
    modalref.componentInstance.mensagem = mensagem;
    modalref.componentInstance.tipo = tipo;
    setTimeout(() => {
      modalref.close();
    }, time);
  }

  exibirErro(mensagem: string): void {
    if (mensagem === undefined || mensagem === null) {
      this.exibirAlerta('Um erro aconteceu, tente novamente!', 'danger');
    } else {
      this.exibirAlerta(mensagem, 'danger');
    }
  }

  exibirSucesso(mensagem: string): void {
    this.exibirAlerta(mensagem, 'success');
  }

  exibirAviso(mensagem: string): void {
    this.exibirAlerta(mensagem, 'warning');
  }

}
