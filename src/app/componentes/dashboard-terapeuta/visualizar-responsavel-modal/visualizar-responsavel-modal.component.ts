import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Responsavel} from '../../../models/responsavel.model';

@Component({
  selector: 'app-visualizar-responsavel-modal',
  templateUrl: './visualizar-responsavel-modal.component.html',
  styleUrls: ['./visualizar-responsavel-modal.component.css']
})
export class VisualizarResponsavelModalComponent implements OnInit {

  pacienteId: number;
  responsavelSelecionado: Responsavel;
  responsaveis: Responsavel[] = [];

  constructor(private ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.responsavelSelecionado = this.responsaveis[0];
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }
}
