export interface ISignInPayload {
  username: string;
  password: string;
}

export interface ISignInResolve {
  username: string;
  token: string;
}

export interface ITodoItem {
  id: string;
  title: string;
  done: boolean;
  dueDate: string;
}
