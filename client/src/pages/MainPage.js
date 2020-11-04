import React, {useContext, useEffect} from 'react';
import {authContext} from "../App";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const MainPage = () => {
  const auth = useContext(authContext);
  const {request, loading, error} = useHttp();

  useEffect(() => {
    request('/api/test/')
      .then(res => {
        if(!res.isAuth){
          auth.setIsAuth(false)
        }
      })
  },[request, auth])

  if(loading){
    return(
      <Loader />
    );
  }

  if(error){
    return (
      <h3>{error.toString()}</h3>
    )
  }

  return(
    <h1>Main page</h1>
  );
}
