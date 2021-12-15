import { authenticatedGet, authenticatedPost } from "../calls";
import { MyInvestment } from "./invest";

export interface LoginToken {
  token: string;
  refreshToken: string;
}

export interface User {
  nombre: string;
  email: string;
  edad: number;
  sexo: string;
  monedas: number;
  perfil: string;
  simulatorData: MyInvestment;
}

export interface RegisterUser extends User {
  nombreApellido: string;
  password: string;
}

export default {
  me: (): Promise<User> => authenticatedGet('/usuario'),
  register: (newUser: RegisterUser) => authenticatedPost("/usuario", newUser),
  login: (email: string, password: string): Promise<LoginToken> => authenticatedPost('/sesion', { usuario: email, password }),
  calculateProfile: (score: number) => authenticatedPost("/usuario/puntaje", {puntaje:score})
};

