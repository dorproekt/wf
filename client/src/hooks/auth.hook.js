import {useCallback, useContext} from "react";
import {useHttp} from "./http.hook";
import {Context} from "../index";

const storageName = 'userInfo';

export const useAuth = () => {
  const {request} = useHttp();
  const {user} = useContext(Context);
  const login = (userInfo) => {
    localStorage.setItem(storageName, JSON.stringify(userInfo));
  }

  const logout = useCallback(() => {
    localStorage.removeItem(storageName);
    user.setIsAuth(false);
  }, [user]);

  const getToken = useCallback(() => {
    const storage = localStorage.getItem(storageName);

    if(storage){
      const data = JSON.parse(storage);

      if(data.hasOwnProperty('token')){
        return data.token;
      }
    }
  }, []);

  const isAuth = useCallback(() => {
    const token = getToken();
    if(token){
      try{
        request(
          '/api/auth/authorization/',
          'POST',
          {},
          {Authorization: `Bearer ${token}`}
        ).then(res => {

          if(res){
            if(res.hasOwnProperty('authorization')){
              user.setIsAuth(res.authorization);
            }
          }else{
            logout();
          }

        })
      }catch (e) {}
    }


  }, [request, getToken, user, logout]);

  return {login, logout, getToken, isAuth}
}