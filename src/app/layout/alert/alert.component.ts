import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() mensagem: string;
  @Input() tipo: string;

  constructor(private modalRef: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.modalRef.dismiss('close');
  }
}
