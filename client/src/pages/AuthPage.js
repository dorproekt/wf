import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/message.hook";
import {useAuth} from "../hooks/auth.hook";
import {authContext} from "../App";

export const AuthPage = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const { request, error, loading} = useHttp();
  const message = useMessage();
  const {login, logout, getToken} = useAuth();
  const authCont = useContext(authContext);

  const clickHandler = useCallback(async (event) => {
    event.preventDefault();

    try {
      const res = await request('/api/auth/login/', 'POST', form);

      if(res.hasOwnProperty('token')){
        login(res);
        authCont.setIsAuth(true);
      }
    }catch (e){}

  }, [form, request, login, authCont]);

  const onChangeHandler = useCallback((e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }, [setForm, form]);

  useEffect(() => {
    const token = getToken();
    if(token){
      try{
        request(
          '/api/auth/authorization/',
          'POST',
          {},
          {Authorization: `Bearer ${token}`}
        ).then(res => {
          console.log(res)
          if(res){
            if(res.hasOwnProperty('authorization')){
              authCont.setIsAuth(res.authorization);
            }
          }else{
            logout();
          }

        })
      }catch (e) {}
    }

    message(error, 'error');
    setForm({email: '', password: ''})
  }, [error, message, getToken, request, authCont, logout]);

  if(loading){
    return <Loader />
  }

  return (
    <>
      <h2 className="center text">Система Електронного Документообігу</h2>
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="input-field col s12">
            <input
              onChange={ onChangeHandler }
              id="email"
              type="email"
              name="email"
              value={ form.email }
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              onChange={ onChangeHandler }
              id="password"
              type="password"
              name="password"
              value={ form.password }
            />
            <label htmlFor="password">Password</label>
          </div>
          <a onClick={ clickHandler } href="/" className="waves-effect waves-light btn">Увійти</a>
        </div>
      </div>
    </>
  )
}