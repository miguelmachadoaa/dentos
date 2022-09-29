import React from 'react';
import useToken from '../../components/App/useToken';
import Login from '../../components/Login/Login';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

export default function Preferences() {

  const { token, setToken, logout } = useToken();

 if (!token) {
  return <Login setToken={setToken} />;
}

  return(
    <h2>Preferences</h2>
  );
}
