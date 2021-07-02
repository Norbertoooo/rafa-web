import {Component, OnInit} from '@angular/core';
import {Responsavel} from '../../models/responsavel.model';
import {ResponsavelService} from '../../shared/services/responsavel.service';
import {AlertaService} from '../../shared/services/alerta.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {EnderecoUtils} from '../../shared/utils/enderecoUtils';

@Component({
  selector: 'app-dados-responsavel',
  templateUrl: './dados-responsavel.component.html',
  styleUrls: ['./dados-responsavel.component.css']
})
export class DadosResponsavelComponent implements OnInit {

  estaBloqueado = true;
  isCollapsed = false;
  responsavel: Responsavel = {};
  dataNascimento;
  nomeSpinner = 'dadosResponsavelSpinner';
  estados = [];

  constructor(private responsavelService: ResponsavelService,
              private alertaService: AlertaService,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.estados = EnderecoUtils.obterEstados();
    this.obterDadosResponsavel();
  }

  obterDadosResponsavel(): void {
    this.responsavelService.buscarDadosResponsavel().subscribe((resposta) => {
      this.responsavel = resposta;
      this.dataNascimento = this.formatarStringDataPadraoUSA();
    }, (error) => {
      this.alertaService.exibirErro(error.error.mensagem);
    });
  }

  editarResponsavel(): void {
    this.obterDadosResponsavel();
    this.estaBloqueado === true ? this.estaBloqueado = false : this.estaBloqueado = true;
  }

  salvarAlteracoes(): void {
    this.mostrarSpinner();
    this.responsavel.dataNascimento = this.formatarStringDataPadraoBR(this.dataNascimento);
    this.responsavelService.atualizarResponsavel(this.responsavel).subscribe(resposta => {
      this.responsavel = resposta;
      this.dataNascimento = this.formatarStringDataPadraoUSA();
      this.estaBloqueado = true;
      this.alertaService.exibirSucesso('Informações alteradas com sucesso!');
      this.esconderSpinner();
    }, error => {
      this.alertaService.exibirErro(error);
      this.obterDadosResponsavel();
      this.esconderSpinner();
    });
  }

  mostrarSpinner(): void {
    this.spinnerService.show(this.nomeSpinner);
  }

  esconderSpinner(): void {
    setTimeout(() => {
      this.spinnerService.hide(this.nomeSpinner);
    }, 600);
  }

  formatarStringDataPadraoUSA(): any {
    const dia = this.responsavel.dataNascimento.split('/')[0];
    const mes = this.responsavel.dataNascimento.split('/')[1];
    const ano = this.responsavel.dataNascimento.split('/')[2];
    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
  }

  formatarStringDataPadraoBR(data: string): any {
    const dia = data.split('-')[2];
    const mes = data.split('-')[1];
    const ano = data.split('-')[0];
    return ('0' + dia).slice(-2) + '/' + ('0' + mes).slice(-2) + '/' + ano;
  }
}
