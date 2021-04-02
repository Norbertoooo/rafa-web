import { Component, OnInit } from '@angular/core';
import {Terapeuta} from '../../models/terapeuta.model';

@Component({
  selector: 'app-dados-responsavel',
  templateUrl: './dados-responsavel.component.html',
  styleUrls: ['./dados-responsavel.component.css']
})
export class DadosResponsavelComponent implements OnInit {
  estaBloqueado = true;
  isCollapsed = false;
  terapeuta = new Terapeuta();

  constructor() { }

  ngOnInit(): void {
  }

}
