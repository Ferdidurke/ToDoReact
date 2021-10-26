import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Link, Route, Redirect} from "react-router-dom";
import './Todos/styles.sass';
import Todos from "./Todos/Todos";
import {Blog} from "./Blog/Blog";
import Main from "./Main";



function App (): ReactElement {

  return (

    <Router>
            <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route path='/todos' component={Todos}/>
                  <Route path='/blog' component={Blog}/>
                  <Redirect to = '/'/>
            </Switch>

    </Router>
  )
}

export default App;

