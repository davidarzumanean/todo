import {useEffect, useState} from "react";
import {Checkbox} from "../../form";
import {TodoItem} from "../TodoItem/TodoItem";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {todoActions, todoSelectors} from "../../../redux/todo.slice";
import styles from "./TodoList.module.scss";

export const TodoList = () => {
  const [checkAll, setCheckAll] = useState(false);
  const todoList = useAppSelector(todoSelectors.todoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoList.length) {
      setCheckAll(todoList.every((todo) => todo.done));
    }
  }, [todoList]);

  if (!todoList.length) return null;

  const toggleCheckAll = () => {
    dispatch(todoActions.toggleAllTodos(!checkAll));
  }

  return (
    <div className={styles.todoWrapper}>
      <table className={styles.todoList}>
        <thead>
        <tr>
          <th>
            <Checkbox checked={checkAll} onChange={toggleCheckAll}/>
          </th>
          <th>Title</th>
          <th>Due date</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo}/>
        ))}
        </tbody>
      </table>
    </div>
  )
}
