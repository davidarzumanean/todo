import type {FC} from "react";
import type {ITodoItem} from "../../../types/types";
import {Button, Checkbox} from "../../form";
import {useAppDispatch} from "../../../redux/hooks";
import {todoActions} from "../../../redux/todo.slice";
import styles from './TodoItem.module.scss';
import {DeleteIcon, EditIcon} from "../../../assets";

export const TodoItem: FC<{ todo: ITodoItem}> = ({todo}) => {
  const dispatch = useAppDispatch();

  const formatReadableDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'});
  }

  const toggleTodo = () => {
    dispatch(todoActions.toggleTodo({
      id: todo.id,
      done: !todo.done,
    }));
  }

  const handleEdit = () => {
    dispatch(todoActions.toggleAddEditModal());
    dispatch(todoActions.setEditTodoItem(todo));
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');

    if (confirmDelete) {
      dispatch(todoActions.deleteTodo(todo.id));
    }
  }

  return (
    <tr className={styles.todoItem}>
      <td>
        <Checkbox onChange={toggleTodo} checked={todo.done} />
      </td>
      <td className={`${styles.todoText} ${todo.done ? styles.done : ''}`}>{todo.title}</td>
      <td className={styles.todoDueDate}>{formatReadableDate(todo.dueDate)}</td>
      <td>
        <Button variant='secondary' onClick={handleEdit} data-testid='edit'><EditIcon /></Button>
        <Button variant='secondary' onClick={handleDelete} data-testid='delete'><DeleteIcon /></Button>
      </td>
    </tr>
  )
}
