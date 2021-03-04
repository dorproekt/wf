import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import 'materialize-css';
import {Navbar} from "./components/Navbar";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App = observer(() => {
  const {user} = useContext(Context);
  const routes = useRoutes(user.isAuth);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <Router>
      { user.isAuth && <Navbar /> }
      <div className='container'>
        { routes }
      </div>
    </Router>
  );
})

export default App;
