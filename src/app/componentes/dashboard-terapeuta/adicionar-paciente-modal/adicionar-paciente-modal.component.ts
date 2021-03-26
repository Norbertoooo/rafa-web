import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adicionar-paciente-modal',
  templateUrl: './adicionar-paciente-modal.component.html',
  styleUrls: ['./adicionar-paciente-modal.component.css']
})
export class AdicionarPacienteModalComponent implements OnInit {

  constructor(private ngbActiveModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }

}
