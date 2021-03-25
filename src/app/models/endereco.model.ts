export class Endereco {
  constructor(
    public rua?: string,
    public bairro?: string,
    public cep?: number,
    public numero?: number,
    public cidade?: string,
    public estado?: string,
    public complemento?: string) {
  }
}
