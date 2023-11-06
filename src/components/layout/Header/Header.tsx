import styles from './Header.module.scss';
import {useEffect, useState} from "react";
import {CheckIcon, MoonIcon, SignOutIcon, SunIcon} from "../../../assets";
import {Button} from "../../form";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {todoActions, todoSelectors} from "../../../redux/todo.slice";
import {useNavigate} from "react-router";

enum Theme {
  light = 'light',
  dark = 'dark',
}

export const Header = () => {
  const [theme, setTheme] = useState<Theme>(Theme.light);
  const isLoggedIn = useAppSelector(todoSelectors.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (theme === Theme.light) {
      setTheme(Theme.dark);
      localStorage.setItem('theme', Theme.dark);
    } else {
      setTheme(Theme.light);
      localStorage.setItem('theme', Theme.light);
    }
  }

  const getTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as Theme);
    }
  }

  const handleSignOut = async () => {
    dispatch(todoActions.signOut());
    navigate('/signin');
  }

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    if (theme === Theme.dark) {
      document.body.classList.add(Theme.dark);
    } else {
      document.body.classList.remove(Theme.dark);
    }
  }, [theme]);

  return (
    <header className={styles.headerContainer}>
      <div className='main-container'>
        <div className={styles.header}>
          <div className={styles.logo}>
            <CheckIcon />
            Todo
          </div>
          <div className={styles.headerRight}>
            <Button className={styles.iconButton} onClick={toggleTheme} variant='secondary'>
              {theme === Theme.light ?
                <MoonIcon /> :
                <SunIcon />
              }
            </Button>
            {isLoggedIn && (
              <Button className={styles.iconButton} onClick={handleSignOut} variant='secondary'>
                <SignOutIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
