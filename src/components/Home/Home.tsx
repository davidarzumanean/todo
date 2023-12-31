import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {todoActions, todoSelectors} from "../../redux/todo.slice";
import {Button, Checkbox} from "../form";
import {AddEditTodoModal} from "../Todo";
import {TodoList} from "../Todo";
import styles from './Home.module.scss';

export const Home = () => {
  const username = useAppSelector(todoSelectors.username);
  const addEditModal = useAppSelector(todoSelectors.addEditModal);
  const showPending = useAppSelector(todoSelectors.showPending);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todoActions.getUser());
    dispatch(todoActions.fetchTodoList());
  }, [dispatch]);

  const handleToggleModal = () => {
    dispatch(todoActions.toggleAddEditModal());
  }

  const toggleFilter = () => {
    dispatch(todoActions.toggleFilter());
  }

  return (
    <div className={`main-container ${styles.home}`}>
      <div className={styles.todoHeader}>
        <h1 className={styles.title}>{username}'s todo list</h1>
        <div>
          <label>
            <Checkbox checked={showPending} onChange={toggleFilter} />
            Show pending
          </label>
          <Button onClick={handleToggleModal}>
            Add Todo
          </Button>
        </div>
      </div>
      <TodoList/>
      {addEditModal.isOpen && <AddEditTodoModal/>}
    </div>
  )
}
