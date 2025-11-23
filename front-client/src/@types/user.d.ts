export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export interface IUpdateMeInput {
  firstname: string;
  lastname: string;
  email: string;
}

export interface IUpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

export interface IReinitializePasswordInput {
  token: string;
  newPassword: string;
  confirmedPassword: string;
}