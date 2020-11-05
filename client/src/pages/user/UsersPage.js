import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/auth.hook";
import {Grid} from "../../components/Grid";
import {Loader} from "../../components/Loader";

export const UsersPage = () => {
  const {isAuth, loading} = useAuth();
  const [dataGrid, setDataGrid] = useState([{id: 1, email: 'dorproekt@ukr.net'}]);

  useEffect(() => {
    isAuth();
  }, [isAuth])

  if(loading){
    return (
      <Loader />
    )
  }

  return (
    <>
      <h1>Список користувачів</h1>
      <Grid dataGrid={dataGrid} />
    </>
  )
}