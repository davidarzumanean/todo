import React from "react";
import type {FC, ReactElement} from "react";
import {useAppSelector} from "../redux/hooks";
import {todoSelectors} from "../redux/todo.slice";
import {Navigate} from "react-router";

export const ProtectedRoute: FC<{children: ReactElement}> = ({children }) => {
  const isLoggedIn = useAppSelector(todoSelectors.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children
}