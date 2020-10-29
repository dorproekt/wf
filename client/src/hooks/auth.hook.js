import {useCallback, useContext, useEffect, useState} from 'react';
import { useHttp } from '../hooks/http.hook';
import {AuthContext} from "../App";

const storageName = 'userData';

export const useAuth = () => {
  const { request, error, loading, setError } = useHttp();
  const [ isAuth, setIsAuth ] = useState(false);
  const auth = useContext(AuthContext);

  const login = useCallback(async infoUser => {

    try{

      const userInfo = await request('/api/auth/login/', 'POST', infoUser);

      if(userInfo && userInfo.token){
        localStorage.setItem(storageName, JSON.stringify(userInfo));
        setIsAuth(true);
        return userInfo;
      }

    }catch (e) {}

  }, [request]);

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    auth.logout();
  }, [auth]);

  const isAuthenticated = useCallback(async () => {

    try{
      const userInfo = JSON.parse(localStorage.getItem(storageName));

      if(userInfo && userInfo.token) {
        const response = await request(
          '/api/auth/authorization/',
          'POST',
          {},
          {Authorization: `Bearer ${userInfo.token}`}
        );

        if(response.authorization){
          setIsAuth(response.authorization);
          auth.login();
        }else{
          auth.logout();
        }

      }else{
        auth.logout();
      }

    }catch (e) {
      setError(e);
    }

  }, [request, setError, auth]);

  useEffect(() => {
    isAuthenticated()
  }, [isAuthenticated]);


  return { isAuth, error, loading, login, logout, isAuthenticated };
}