import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './Todos/styles.sass';
import Todos from "./Todos/Todos";
import {Blog} from "./Blog/Blog";
import Main from "./Main";
import RegistrationForm from "./Blog/AuthorisationPage/RegistrationForm";
import LoginForm from "./Blog/AuthorisationPage/LoginForm";



function App (): ReactElement {

  return (

    <Router>
            <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route path='/todos' component={Todos}/>
                  <Route exact path='/blog' component={Blog}/>
                  <Route path='/register' component={RegistrationForm}/>
                  <Route path='/login' component={LoginForm}/>
                  <Redirect to = '/'/>
            </Switch>

    </Router>
  )
}

export default App;

