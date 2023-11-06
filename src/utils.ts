import type {ITodoItem} from "./types/types";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const reportError = (error: unknown) => {
  throw new Error(getErrorMessage(error));
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
}

export const saveUser = (username: string) => {
  localStorage.setItem('username', username);
}

export const removeUser = () => {
  localStorage.removeItem('username');
}

export const getUser = (): string | null => {
  return localStorage.getItem('username');
}

export const saveTodoData = (todoList: ITodoItem[], token: string) => {
  localStorage.setItem(token, JSON.stringify(todoList));
}

export const deleteTodoData = (token: string) => {
  localStorage.removeItem(token);
}

export const getSavedTodoData = (token: string) => {
  return localStorage.getItem(token) || '[]';
}
