import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Responsavel} from '../../../models/responsavel.model';
import {Paciente} from '../../../models/paciente.model';
import {PacienteService} from '../../../shared/services/paciente.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertaService} from '../../../shared/services/alerta.service';
import {formatDate} from '@angular/common';
import {EnderecoUtils} from '../../../shared/utils/enderecoUtils';
import {ParentescoUtils} from '../../../shared/utils/parentesco.utils';

@Component({
  selector: 'app-adicionar-paciente-modal',
  templateUrl: './adicionar-paciente-modal.component.html',
  styleUrls: ['./adicionar-paciente-modal.component.css']
})
export class AdicionarPacienteModalComponent implements OnInit {

  @Output() sucesso = new EventEmitter();

  responsavel: Responsavel = {};
  estados = [];
  parentesco = [];
  paciente: Paciente = {};
  formularioPaciente: FormGroup;

  constructor(private ngbActiveModal: NgbActiveModal,
              private pacienteService: PacienteService,
              private formBuilder: FormBuilder,
              private alertService: AlertaService) {
  }

  ngOnInit(): void {
    this.estados = EnderecoUtils.obterEstados();
    this.parentesco = ParentescoUtils.obterOpcoesParentesco();
    this.formularioPaciente = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      responsaveis: this.formBuilder.array([ this.criarResponsavel() ])
    });
  }

  criarResponsavel(): FormGroup {
    return this.formBuilder.group({
      dataNascimento: new FormControl(''),
      nomeCompleto: new FormControl(''),
      parentesco: new FormControl(''),
      telefone: new FormControl(''),
      cpf: new FormControl(''),
      login: this.formBuilder.group({
        email: ['']
      }),
      endereco: this.formBuilder.group({
        bairro: [''],
        cep: [''],
        cidade: [''],
        complemento: [''],
        estado: [''],
        numero: [''],
        rua: ['']
      })
    });
  }

  cancelar(): void {
    this.ngbActiveModal.close();
  }

  cadastrar(): void {
    console.log(this.formularioPaciente.value);
    const form = this.formularioPaciente.value;
    console.log(form);
    form.dataNascimento = formatDate(form.dataNascimento, 'dd/MM/yyyy', 'pt-BR');
    form.responsaveis.forEach(responsavel => {
      console.log(responsavel);
      responsavel.dataNascimento = formatDate(responsavel.dataNascimento, 'dd/MM/yyyy', 'pt-BR');
    });
    this.pacienteService.adicionarPaciente(form).subscribe((resposta) => {
      this.alertService.exibirSucesso('Paciente Cadastrado com sucesso!');
      this.sucesso.emit(true);
      this.ngbActiveModal.close();
    }, (error) => {
      this.alertService.exibirErro(error.mensagem);
    });
  }

  adicionarResponsavel(): void {
    const responsavel = this.formularioPaciente.controls.responsaveis as FormArray;
    responsavel.push(this.criarResponsavel());
  }

  formatarData(dataNascimento): void {
    const dataNascimento1 = formatDate(dataNascimento, 'dd/MM/yyyy', 'pt-BR');
  }

  removerResponsavel(index: number): void {
    const responsavel = this.formularioPaciente.controls.responsaveis as FormArray;
    responsavel.removeAt(index);
  }

}
