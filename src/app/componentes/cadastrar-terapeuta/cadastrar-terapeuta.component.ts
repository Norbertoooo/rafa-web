import {Component, OnInit} from '@angular/core';
import {Terapeuta} from '../../models/terapeuta.model';
import {CadastrarTerapeutaService} from '../../shared/services/cadastrar-terapeuta.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {AlertaService} from '../../shared/services/alerta.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {EnderecoUtils} from '../../shared/utils/enderecoUtils';

@Component({
  selector: 'app-registrar',
  templateUrl: './cadastrar-terapeuta.component.html',
  styleUrls: ['./cadastrar-terapeuta.component.css']
})
export class CadastrarTerapeutaComponent implements OnInit {

  terapeuta: Terapeuta = new Terapeuta();
  estados = [];

  constructor(private cadastrarTerapeutaService: CadastrarTerapeutaService,
              private router: Router, private alertService: AlertaService) {
  }

  ngOnInit(): void {
    this.estados = EnderecoUtils.obterEstados();
  }

  cadastrar(): void {
    console.log(this.terapeuta);
    this.formatarData(this.terapeuta.dataNascimento);
    this.cadastrarTerapeutaService.cadastrarTerapeuta(this.terapeuta)
      .subscribe((resposta: HttpResponse<any>) => {
        console.log(resposta);
        this.router.navigateByUrl('/').finally(() => {
          this.alertService.exibirSucesso('Cadastro efetuado com sucesso!');
        });
      }, (error: HttpErrorResponse) => {
        this.alertService.exibirErro(error.message);
      });
  }

  formatarData(dataNascimento): void {
    this.terapeuta.dataNascimento = formatDate(dataNascimento, 'dd/MM/yyyy', 'pt-BR');
  }
}
