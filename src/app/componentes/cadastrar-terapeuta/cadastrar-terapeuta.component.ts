import {Component, OnInit} from '@angular/core';
import {Terapeuta} from '../../models/terapeuta.model';
import {CadastrarTerapeutaService} from '../../services/cadastrar-terapeuta.service';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './cadastrar-terapeuta.component.html',
  styleUrls: ['./cadastrar-terapeuta.component.css']
})
export class CadastrarTerapeutaComponent implements OnInit {

  terapeuta: Terapeuta = new Terapeuta();

  constructor(private cadastrarTerapeutaService: CadastrarTerapeutaService,
              private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
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
