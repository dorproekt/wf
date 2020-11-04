import React, {useEffect} from 'react';
import {useAuth} from "../hooks/auth.hook";

export const MainPage = () => {
  const {isAuth} = useAuth();

  useEffect(() => {
    isAuth();
  }, [isAuth])

  return(
    <h1>Main page</h1>
  );
}
