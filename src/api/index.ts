import {getSavedTodoData, reportError, saveUser, setToken} from "../utils";
import type {ISignInPayload, ISignInResolve} from "../types/types";
import {ITodoItem} from "../types/types";

export const postSignIn = async ({username, password}: ISignInPayload): Promise<ISignInResolve> => {
  try {
    const token = crypto.randomUUID();
    setToken(token);
    saveUser(username);

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          token,
          username,
        })
      }, 500)
    });
  } catch (e) {
    return reportError(e)
  }
}

export const postTodo = async ({title, dueDate}: Pick<ITodoItem, 'title' | 'dueDate'>): Promise<ITodoItem> => {
  try {
    const uuid = crypto.randomUUID();

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: uuid,
          title,
          dueDate,
          done: false,
        })
      }, 500)
    });
  } catch (e) {
    return reportError(e)
  }
}

export const getTodoList = async (token: string): Promise<ITodoItem[]> => {
  try {
    const data = getSavedTodoData(token);

    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JSON.parse(data));
      }, 500)
    });
  } catch (e) {
    return reportError(e)
  }
}
