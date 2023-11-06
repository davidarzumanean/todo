import React from 'react';
import type {FC} from 'react';
import { Routes, Route } from 'react-router-dom';
import {SignIn} from '../components/SignIn';
import {Home} from '../components/Home';
import {ProtectedRoute} from "./ProtectedRoute";

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
};
