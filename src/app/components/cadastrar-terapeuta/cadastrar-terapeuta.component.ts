import {Component, OnInit} from '@angular/core';
import {Terapeuta} from '../../models/terapeuta.model';
import {CadastrarTerapeutaService} from '../../shared/services/cadastrar-terapeuta.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {AlertaService} from '../../shared/services/alerta.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {EnderecoUtils} from '../../shared/utils/enderecoUtils';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-registrar',
  templateUrl: './cadastrar-terapeuta.component.html',
  styleUrls: ['./cadastrar-terapeuta.component.css']
})
export class CadastrarTerapeutaComponent implements OnInit {

  terapeuta: Terapeuta = new Terapeuta();
  estados = [];

  constructor(private cadastrarTerapeutaService: CadastrarTerapeutaService,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertaService) {
  }

  ngOnInit(): void {
    this.estados = EnderecoUtils.obterEstados();
  }

  cadastrar(): void {
    this.formatarData(this.terapeuta.dataNascimento);
    this.spinnerService.show();
    this.cadastrarTerapeutaService.cadastrarTerapeuta(this.terapeuta)
      .subscribe((resposta: HttpResponse<any>) => {
        this.router.navigateByUrl('/').finally(() => {
          this.alertService.exibirSucesso('Cadastro efetuado com sucesso!');
          this.spinnerService.hide();
        });
      }, (error: HttpErrorResponse) => {
        this.alertService.exibirErro(error.message);
        this.spinnerService.hide();
      });
  }

  formatarData(dataNascimento): void {
    this.terapeuta.dataNascimento = formatDate(dataNascimento, 'dd/MM/yyyy', 'pt-BR');
  }
}
