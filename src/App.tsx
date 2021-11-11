import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './Todos/styles.sass';
import Todos from "./Todos/Todos";
import {Blog} from "./Blog/Blog";
import Main from "./Main";
import RegistrationForm from "./AuthorisationPage/RegistrationForm";
import {RootState} from "./store/redux-toolkit/store";
import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import {logout} from "./store/redux-toolkit/reducers/authReducer";




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

