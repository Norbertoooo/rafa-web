import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Desafio} from '../../../models/desafio.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DesafiosService} from '../../../shared/services/desafios.service';
import {AlertaService} from '../../../shared/services/alerta.service';

@Component({
  selector: 'app-editar-desafio',
  templateUrl: './editar-desafio.component.html',
  styleUrls: ['./editar-desafio.component.css']
})
export class EditarDesafioComponent implements OnInit {

  @Input() desafio: Desafio = {};
  emitirConfirmacao = new EventEmitter();

  constructor(private ngbActiveModal: NgbActiveModal, private desafiosService: DesafiosService, private alertaService: AlertaService) {
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }

  salvar(): void {
    this.desafiosService.atualizarDesafio(this.desafio.id, this.desafio).subscribe( () => {
      this.emitirConfirmacao.emit(true);
      this.alertaService.exibirSucesso('Desafio alterado com sucesso!');
      this.cancelar();
    });
  }
}
