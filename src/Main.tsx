import React, {ReactElement} from "react";
import {BottomNavigation, BottomNavigationAction, Button, ButtonGroup} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import RegistrationForm from "./AuthorisationPage/RegistrationForm";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/redux-toolkit/store";
import {logout} from "./store/redux-toolkit/reducers/authReducer";
import {Login} from "@mui/icons-material";
import LoginForm from "./AuthorisationPage/LoginForm";
import {use} from "msw/lib/types/utils/internal/requestHandlerUtils";


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
