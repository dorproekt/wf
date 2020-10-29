import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import 'materialize-css';
import {Navbar} from "./components/Navbar";

export const AuthContext = React.createContext({});

function App() {
  const routes = useRoutes();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      <Router>
        { isAuthenticated ? <Navbar /> : ''}
        <div className='container'>
          { routes(isAuthenticated) }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
