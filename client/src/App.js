import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import 'materialize-css';
import {Navbar} from "./components/Navbar";

export const authContext = createContext({});

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const routes = useRoutes(isAuth);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <authContext.Provider value={{isAuth, setIsAuth}}>
      <Router>
        { isAuth && <Navbar /> }
        <div className='container'>
          { routes }
        </div>
      </Router>
    </authContext.Provider>
  );
}

export default App;
