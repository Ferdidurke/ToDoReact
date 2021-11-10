import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {Link} from "react-router-dom";
import React, {ReactElement} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/redux-toolkit/store";
import {logout} from "./store/redux-toolkit/reducers/authReducer";


export default function Header (): ReactElement {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    if (isAuthenticated)
    return (
        <>
        <BottomNavigation
            showLabels
            sx={{backgroundColor: 'primary.dark'}}>
            <BottomNavigationAction sx={{color: 'white'}} label="TODOS"
                                    component={Link}
                                    to="/todos"/>
            <BottomNavigationAction sx={{color: 'white'}} label="BLOG"
                                    component={Link}
                                    to="/blog"/>
            <BottomNavigationAction sx={{color: 'white'}} label="LOGOUT"
                                    component={Link}
                                    onClick={()=>dispatch(logout())}
                                    to="/"/>
        </BottomNavigation>

            </>

    )
    return (
        <BottomNavigation
            showLabels
            sx={{backgroundColor: 'primary.dark'}}>
            <BottomNavigationAction sx={{color: 'white'}} label="LOGIN"
                                    component={Link}
                                    to="/login"/>
            <BottomNavigationAction sx={{color: 'white'}} label="REGISTER"
                                    component={Link}
                                    to="/register"/>
        </BottomNavigation>
    )

}
