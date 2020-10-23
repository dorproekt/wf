import {useCallback, useState} from 'react';
import { useHttp } from '../hooks/http.hook';

const storageName = 'userData';

// export const useAuth = () => {
//
//   const { request } = useHttp();
//
//   const login = useCallback(async infoUser => {
//
//     try{
//
//       const userInfo = await request('/api/auth/login/', 'POST', infoUser);
//
//       if(userInfo && userInfo.token){
//         localStorage.setItem(storageName, JSON.stringify(userInfo));
//
//         return userInfo;
//       }
//
//     }catch (e) {
//       console.log(e, 'error');
//     }
//
//
//   }, [request]);
//
//   const isAuth = useCallback(async () => {
//     try{
//       const userInfo = JSON.parse(localStorage.getItem(storageName));
//       // console.log(userInfo);
//
//       if(userInfo && userInfo.token){
//         const response = await request(
//           '/api/auth/authorization/',
//           'POST',
//           {},
//           { Authorization: `Bearer ${ userInfo.token }` }
//         );
//
//         return response.authorization;
//       }else{
//         return 'Ви не авторизовані';
//       }
//     }catch (e) {
//       // console.log(e, 'error');
//     }
//
//   }, [request]);
//
//   const logout = useCallback(() => {
//       localStorage.removeItem(storageName);
//   }, []);
//
//   return { login, isAuth, logout };
// }

export const useAuth = () => {
  const { request, error, loading, data, setError } = useHttp();
  const [ isAuth, setIsAuth ] = useState(false);

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
        setIsAuth(response.authorization);
      }else{
        throw new Error('Ви не авторизовані');
      }

    }catch (e) {
      setError(e);
    }

  }, [request, setError]);

  return { isAuth, error, loading, login, data, isAuthenticated };
}