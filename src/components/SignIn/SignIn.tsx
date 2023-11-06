import type {FormEvent} from "react";
import styles from './SignIn.module.scss';
import {useEffect, useState} from "react";
import {postSignIn} from "../../api";
import {Button, Input} from "../form";
import {useAppDispatch} from "../../redux/hooks";
import {todoActions} from "../../redux/todo.slice";
import {useNavigate} from "react-router";

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      const res = await dispatch(todoActions.signIn({username, password})).unwrap();
      setIsLoading(false);

      if (res) {
        navigate('/', {replace: true});
      }
    }
  }

  useEffect(() => {
    if (username && password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [password, username]);

  return (
    <div className={`main-container ${styles.signinContainer}`}>
      <div className={styles.signinBox}>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <label>
            <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <Button type="submit" variant='primary' disabled={!isFormValid || isLoading}>Sign In</Button>
        </form>
      </div>
    </div>
  )
}