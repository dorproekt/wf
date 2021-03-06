import React, {useEffect} from 'react';
import {useAuth} from "../../hooks/auth.hook";

export const UsersPage = () => {
  const {isAuth} = useAuth();

  useEffect(() => {
    isAuth();
  }, [isAuth])

  return (
    <>
      <h1>Список користувачів</h1>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Item Name</th>
          <th>Item Price</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>Alvin</td>
          <td>Eclair</td>
          <td>$0.87</td>
        </tr>
        <tr>
          <td>Alan</td>
          <td>Jellybean</td>
          <td>$3.76</td>
        </tr>
        <tr>
          <td>Jonathan</td>
          <td>Lollipop</td>
          <td>$7.00</td>
        </tr>
        </tbody>
      </table>
    </>
  )
}