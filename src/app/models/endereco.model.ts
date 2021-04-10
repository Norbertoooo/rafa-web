export class Endereco {
  constructor(
    public rua?: string,
    public bairro?: string,
    public cep?: number,
    public numero?: number,
    public cidade?: string,
    public estado = '',
    public complemento?: string) {
  }
}

export interface EnderecoInterface {
  rua?: string;
  bairro?: string;
  cep?: number;
  numero?: number;
  cidade?: string;
  estado?: string;
  complemento?: string;
}
