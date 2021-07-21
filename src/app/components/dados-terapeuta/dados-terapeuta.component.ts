import {Component, OnInit} from '@angular/core';
import {TerapeutaService} from '../../shared/services/terapeuta.service';
import {Terapeuta} from '../../models/terapeuta.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertaService} from '../../shared/services/alerta.service';
import {EnderecoUtils} from '../../shared/utils/enderecoUtils';

@Component({
  selector: 'app-dados-terapeuta',
  templateUrl: './dados-terapeuta.component.html',
  styleUrls: ['./dados-terapeuta.component.css']
})
export class DadosTerapeutaComponent implements OnInit {

  terapeuta = new Terapeuta();
  dataNascimento: any;
  estaBloqueado = true;
  isCollapsed = true;
  estados = [];

  constructor(private terapeutaService: TerapeutaService,
              private spinnerService: NgxSpinnerService,
              private alertaService: AlertaService) {
  }

  ngOnInit(): void {
    this.estados = EnderecoUtils.obterEstados();
    this.obterDadosTerapeuta();
  }

  editarTerapeuta(): void {
    this.estaBloqueado === true ? this.estaBloqueado = false : this.estaBloqueado = true;
    this.obterDadosTerapeuta();
  }

  obterDadosTerapeuta(): void {
    this.terapeutaService.buscarDadosTerapeuta().subscribe(resposta => {
      this.terapeuta = resposta;
      this.dataNascimento = this.formatarStringDataPadraoUSA();
    });
  }

  salvarAlteracoes(): void {
    console.log(this.terapeuta.dataNascimento);
    console.log(this.dataNascimento);
    this.mostrarSpinner();
    this.terapeuta.dataNascimento = this.formatarStringDataPadraoBR(this.dataNascimento);
    this.terapeutaService.atualizarTerapeuta(this.terapeuta).subscribe(resposta => {
      this.terapeuta = resposta;
      this.dataNascimento = this.formatarStringDataPadraoUSA();
      this.estaBloqueado = true;
      this.alertaService.exibirSucesso('Informações alteradas com sucesso!');
      this.esconderSpinner();
    });
  }

  mostrarSpinner(): void {
    this.spinnerService.show('dadosTerapeutaSpinner');
  }

  esconderSpinner(): void {
    setTimeout(() => {
      this.spinnerService.hide('dadosTerapeutaSpinner');
    }, 600);
  }

  formatarStringDataPadraoUSA(): any {
    const dia = this.terapeuta.dataNascimento.split('/')[0];
    const mes = this.terapeuta.dataNascimento.split('/')[1];
    const ano = this.terapeuta.dataNascimento.split('/')[2];
    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
  }

  formatarStringDataPadraoBR(data: string): any {
    const dia = data.split('-')[2];
    const mes = data.split('-')[1];
    const ano = data.split('-')[0];
    return ('0' + dia).slice(-2) + '/' + ('0' + mes).slice(-2) + '/' + ano;
  }

}
