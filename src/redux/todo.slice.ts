import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTodoList, postSignIn, postTodo} from "../api";
import {deleteTodoData, getToken, getUser, removeToken, removeUser, saveTodoData} from "../utils";
import type {ISignInPayload, ITodoItem} from "../types/types";
import type {RootState} from "./store";

interface ITodoState {
  username: string;
  list: ITodoItem[];
  modal: {
    isOpen: boolean;
    data: ITodoItem | undefined;
  }
}

const initialState: ITodoState = {
  username: '',
  list: [],
  modal: {
    isOpen: false,
    data: undefined,
  }
};

const signIn = createAsyncThunk(
  'todo/signIn',
  async ({username, password}: ISignInPayload, thunkAPI) => {
    return await postSignIn({username, password});
  }
)

const fetchTodoList = createAsyncThunk(
  'todo/fetchTodoList',
  async (_, thunkAPI) => {
    return await getTodoList(getToken()!);
  }
)

const addTodo = createAsyncThunk(
  'todo/addTodo',
  async ({title, dueDate}: Pick<ITodoItem, 'title' | 'dueDate'>, thunkAPI) => {
    return await postTodo({title, dueDate});
  }
)

const editTodo = createAsyncThunk(
  'todo/editTodo',
  async ({id, title, dueDate}: Pick<ITodoItem, 'id' | 'title' | 'dueDate'>, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const index = todoSelectors.getTodoIndex(id)(state);

    return {index, title, dueDate};
  }
)

const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id: string, thunkAPI) => {
    return id;
  }
)

const toggleTodo = createAsyncThunk(
  'todo/toggleTodo',
  async ({id, done}: { id: ITodoItem['id'], done: ITodoItem['done'] }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const index = todoSelectors.getTodoIndex(id)(state);

    return {index, done};
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    signOut: (state) => {
      state.username = '';
      state.list = [];
      deleteTodoData(getToken()!);
      removeUser();
      removeToken();
    },
    getUser: (state) => {
      const user = getUser();
      if (user) state.username = user;
    },
    toggleAddEditModal: (state) => {
      state.modal.isOpen = !state.modal.isOpen;
      if (!state.modal.isOpen) {
        state.modal.data = undefined;
      }
    },
    setEditTodoItem: (state, action) => {
      state.modal.data = action.payload;
    },
    toggleAllTodos: (state, action) => {
      state.list = state.list.map((todo) => {
        return {
          ...todo,
          done: action.payload,
        }
      });
      saveTodoData(state.list, getToken()!);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const {username} = action.payload;
      state.username = username;
    })
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.list.push(action.payload);
      saveTodoData(state.list, getToken()!);
    })
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.list = action.payload;
    })
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const {index, done} = action.payload;
      state.list[index].done = done;
      saveTodoData(state.list, getToken()!);
    })
    builder.addCase(editTodo.fulfilled, (state, action) => {
      const {index, title, dueDate} = action.payload;
      state.list[index] = {
        ...state.list[index],
        title,
        dueDate,
      };
      saveTodoData(state.list, getToken()!);
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((todo) => todo.id !== id);
      saveTodoData(state.list, getToken()!);
    })
  },
});

export const todoActions = {
  signIn,
  addTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
  fetchTodoList,
  ...todoSlice.actions,
};

export const todoSelectors = {
  username: (state: RootState) => state.todo.username,
  todoList: (state: RootState) => state.todo.list,
  isLoggedIn: () => getToken(),
  getTodoIndex: (todoId: ITodoItem['id']) => (state: RootState) => {
    return state.todo.list.findIndex((todo) => todo.id === todoId);
  },
  addEditModal: (state: RootState) => state.todo.modal
}

export default todoSlice.reducer;
