import { authenticatedPost } from "../calls";

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
};
