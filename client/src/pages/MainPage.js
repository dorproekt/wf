import React from 'react';
import {useHistory} from 'react-router-dom';

export const MainPage = () => {
  const history = useHistory();


  const onClickHandler = () => {
    console.log(1234);
    history.push('/users');
  }

  return(
    <>
      <h1>MainPage</h1>
      <button onClick={onClickHandler}>BTN</button>
    </>
  );
}
