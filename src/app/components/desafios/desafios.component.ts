import {Component, OnInit} from '@angular/core';
import {DesafiosService} from '../../shared/services/desafios.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CadastrarDesafioComponent} from './cadastrar-desafio/cadastrar-desafio.component';
import {Desafio} from '../../models/desafio.model';
import {AlertaService} from '../../shared/services/alerta.service';
import {EditarDesafioComponent} from './editar-desafio/editar-desafio.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {ConfirmarExclusaoDesafioComponent} from './confirmar-exclusao-desafio/confirmar-exclusao-desafio.component';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent implements OnInit {

  isCollapsed = true;
  desafios: Desafio[];
  tamanhoPagina = 10;
  paginaAtual = 1;
  totalItens: any;
  desafioSpinner = 'desafioSpinner';

  constructor(private desafiosService: DesafiosService, private ngbModalService: NgbModal,
              private alertaService: AlertaService, private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.listarDesafios();
  }

  cadastrarDesafio(): void {
    const modalRef = this.ngbModalService.open(CadastrarDesafioComponent);
    modalRef.componentInstance.emitirConfirmacao.subscribe(resposta => {
      if (resposta) {
        this.listarDesafios();
      }
    });
  }

  listarDesafios(): void {
    this.spinnerService.show(this.desafioSpinner);
    this.desafiosService.obterDesafios(this.paginaAtual - 1, this.tamanhoPagina).subscribe(resposta => {
      this.desafios = resposta.content;
      this.totalItens = resposta.totalElements;
      this.spinnerService.hide(this.desafioSpinner);
    });
  }

  abrirConfirmacaoExclusao(desafio: Desafio): void {
    const modalRef = this.ngbModalService.open(ConfirmarExclusaoDesafioComponent);
    modalRef.componentInstance.desafio = desafio;
    modalRef.componentInstance.emitirConfirmacao.subscribe(resposta => {
      if (resposta) {
        this.deletarDesafio(desafio.id);
      }
    });
  }

  deletarDesafio(id: number): void {
    this.desafiosService.deletarDesafio(id).subscribe(resposta => {
      this.alertaService.exibirSucesso('Desafio excluído com sucesso!');
      this.listarDesafios();
    });
  }

  editarDesafio(desafio: Desafio): void {
    const modalRef = this.ngbModalService.open(EditarDesafioComponent);
    modalRef.componentInstance.desafio = desafio;
    modalRef.componentInstance.emitirConfirmacao.subscribe(resposta => {
      if (resposta) {
        this.listarDesafios();
      }
    });
  }
}
