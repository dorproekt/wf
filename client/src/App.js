import React, { useEffect } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import 'materialize-css';
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";


function App() {
  const { allRoutes, authRoutes } = useRoutes();
  const {isAuthenticated, isAuth} = useAuth();
  const r1 = allRoutes();
  const r2 = authRoutes();

  useEffect(() => {
    isAuthenticated();
    window.M.updateTextFields();
  }, [isAuthenticated]);

  return (
    <Router>
        { isAuth ? <Navbar /> : '' }
      <div className='container'>
        { isAuth ? r1 : r2 }
      </div>
    </Router>
  );


}

export default App;
