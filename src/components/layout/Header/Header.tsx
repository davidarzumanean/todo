import styles from './Header.module.scss';
import {useEffect, useState} from "react";
import {CheckIcon, MoonIcon, SignOutIcon, SunIcon} from "../../../assets";
import {Button} from "../../form";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {todoActions, todoSelectors} from "../../../redux/todo.slice";
import {useNavigate} from "react-router";
import {useThemeHook} from "../../../hooks/useTheme.hook";

enum Theme {
  light = 'light',
  dark = 'dark',
}

export const Header = () => {
  const isLoggedIn = useAppSelector(todoSelectors.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {theme, toggleTheme} = useThemeHook();

  const handleSignOut = async () => {
    dispatch(todoActions.signOut());
    navigate('/signin');
  }

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
