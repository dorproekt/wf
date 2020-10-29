import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useMessage} from "../hooks/message.hook";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../App";


export const AuthPage = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const {login, error} = useAuth();
  const message = useMessage();
  const auth = useContext(AuthContext);

  const clickHandler = useCallback(async (event) => {
    event.preventDefault();

    const userInfo = await login(form);

    if(userInfo && userInfo.hasOwnProperty('userId')){
      auth.login();
    }

  }, [login, form, auth]);

  useEffect(() => {
    message(error);
  }, [error, message]);

  const onChangeHandler = useCallback((e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }, [setForm, form]);

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