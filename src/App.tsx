import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import './Todos/styles.sass';
import Todos from "./Todos/Todos";
import {Blog} from "./Blog/Blog";
import Main from "./Main";
import RegistrationForm from "./AuthorisationPage/RegistrationForm";
import {RootState} from "./store/redux-toolkit/store";
import {useSelector} from "react-redux";



function App (): ReactElement {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)

    if (isAuthenticated) {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route path='/todos' component={Todos}/>
                    <Route exact path='/blog' component={Blog}/>
                    <Redirect to = '/'/>
                </Switch>
            </Router>
        )
    }

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/register' component={RegistrationForm}/>
                <Redirect to = '/'/>
            </Switch>
        </Router>
    )
}

export default App;

