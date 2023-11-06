import {useEffect, useState} from "react";
import type {FC, FormEvent} from "react";
import {Button, Input} from "../../form";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {todoActions, todoSelectors} from "../../../redux/todo.slice";
import styles from './AddEditTodoModal.module.scss';

export const AddEditTodoModal: FC = () => {
  const modal = useAppSelector(todoSelectors.addEditModal);
  const [title, setTitle] = useState(modal.data?.title || '');
  const [dueDate, setDueDate] = useState(modal.data?.title || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (title && dueDate) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, dueDate]);

  useEffect(() => {
    if (modal.data) {
      setTitle(modal.data.title);
      setDueDate(modal.data.dueDate);
    }
  }, [modal.data]);

  useEffect(() => {
    return () => {
      setTitle('');
      setDueDate('');
    }
  }, [dispatch]);

  if (!modal.isOpen) return null;

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !dueDate) return;

    setIsLoading(true);

    if (modal.data) {
      await dispatch(todoActions.editTodo({
        id: modal.data.id,
        title,
        dueDate,
      })).unwrap();
    } else {
      await dispatch(todoActions.addTodo({
        title,
        dueDate,
      })).unwrap();
    }

    setIsLoading(false);
    dispatch(todoActions.toggleAddEditModal());
  }

  const handleToggle = () => {
    dispatch(todoActions.toggleAddEditModal());
  }

  return (
    <div className={styles.modalOverlay} onClick={handleToggle}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Add todo</h2>
        <form onSubmit={handleSubmit}>
          <Input type='text' data-testid='todo-modal-title' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Input type='date' data-testid='todo-modal-date' min={getTodayDate()} value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
          <Button type='submit' disabled={isLoading || !isFormValid}>{modal.data ? 'Save' : 'Add todo'}</Button>
        </form>
      </div>
    </div>
  )
}
