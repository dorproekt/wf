import React, { useState, useCallback } from 'react';
import {useAuth} from "../hooks/auth.hook";

export const AuthPage = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const { login, isAuth, error, data, loading, isAuthenticated } = useAuth();

  const clickHandler = useCallback(async (event) => {
    event.preventDefault();

    await login(form);

  }, [form, login]);

  const onChangeHandler = useCallback((e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }, [setForm, form]);


  return (
    <>
      <h2 className="center text">Система Електронного Документообігу { form.email } - { form.password }</h2>
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
          <button>Check</button>
          <p>{ error ? error.message : '' }</p>
          <p>{ loading ? 'Loading...' : '' }</p>
          <p>{ data ? data.token : '' }</p>
          <p>{ isAuth ? 3333: '' }</p>
        </div>
      </div>
    </>
  )
}