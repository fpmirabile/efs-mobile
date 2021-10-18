import { authenticatedPost } from "../calls";

export interface User {
  name: string;
  email: string;
  sex: string;
  age: number;
}

export interface RegisterUser extends User {
  password: string;
}

export default {
  register: (newUser: RegisterUser) => authenticatedPost("/usuario", newUser),
};
