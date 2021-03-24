export class RespostaAutenticacao {
  constructor(
    public email: string,
    public perfil: string,
    public token: string
  ) {
  }
}
