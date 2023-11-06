import type {FC, ReactElement} from "react";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import styles from './Layout.module.scss';
import {useAppSelector} from "../../redux/hooks";
import {todoSelectors} from "../../redux/todo.slice";
import {Navigate} from "react-router";

export const Layout: FC<{ children: ReactElement }> = ({children}) => {
  const isLoggedIn = useAppSelector(todoSelectors.isLoggedIn);



  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.contentContainer}>
        {children}
      </div>
      <Footer />
    </div>
  );
}