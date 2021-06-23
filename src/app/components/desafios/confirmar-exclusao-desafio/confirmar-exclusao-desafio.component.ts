import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Desafio} from '../../../models/desafio.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmar-exclusao-desafio',
  templateUrl: './confirmar-exclusao-desafio.component.html',
  styleUrls: ['./confirmar-exclusao-desafio.component.css']
})
export class ConfirmarExclusaoDesafioComponent implements OnInit {

  @Input() desafio: Desafio = {};
  emitirConfirmacao = new EventEmitter();

  constructor(private ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }

  excluir(): void {
    this.emitirConfirmacao.emit(true);
    this.cancelar();
  }
}
