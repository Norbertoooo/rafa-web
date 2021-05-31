import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DesafiosService} from '../../../shared/services/desafios.service';
import {Desafio} from '../../../models/desafio.model';
import {AlertaService} from '../../../shared/services/alerta.service';


@Component({
  selector: 'app-cadastrar-desafio',
  templateUrl: './cadastrar-desafio.component.html',
  styleUrls: ['./cadastrar-desafio.component.css']
})
export class CadastrarDesafioComponent implements OnInit {

  emitirConfirmacao = new EventEmitter();
  desafio: Desafio = {};

  constructor(private ngbActiveModal: NgbActiveModal, private desafiosService: DesafiosService, private alertaService: AlertaService) { }

  ngOnInit(): void {
    this.desafio.scoreInicial = 0;
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }

  cadastrar(): void {
    this.desafiosService.cadastrarDesafio(this.desafio).subscribe( resposta => {
      this.alertaService.exibirSucesso('Desafio cadastrado com sucesso!');
      this.cancelar();
      this.emitirConfirmacao.emit(true);
    });
  }
}
