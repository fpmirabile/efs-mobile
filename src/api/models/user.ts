import { authenticatedPost } from "../calls";

export interface LoginToken {
  token: string;
  refreshToken: string;
}

export interface User {
  nombreApellido: string;
  email: string;
  edad: number;
  sexo: string;
}


export interface RegisterUser extends User {
  password: string;
}

export default {
  register: (newUser: RegisterUser) => authenticatedPost("/usuario", newUser),
  login: (email: string, password: string): Promise<LoginToken> => authenticatedPost('/sesion', { usuario: email, password }),
  calculateProfile: (score: number) => authenticatedPost("/usuario/puntaje", {puntaje:score})
};

