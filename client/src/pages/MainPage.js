import React, {useEffect} from 'react';
import {useAuth} from "../hooks/auth.hook";

export const MainPage = () => {
  useAuth();

  useEffect(() => {
  },[])

  return(
    <h1>MainPage</h1>
  );
}
