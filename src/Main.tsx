import React, {ReactElement} from "react";
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {useSelector} from "react-redux";
import {RootState} from "./store/redux-toolkit/store";
import LoginForm from "./AuthorisationPage/LoginForm";



export default function Main () : ReactElement {
    const { isAuthenticated } = useSelector((state:RootState) => state.auth)
    const history = useHistory()
    if (isAuthenticated) {
        history.push('/blog')
    }
    return (
        <div>
            <Header/>
            <LoginForm/>
        </div>
    )
}
