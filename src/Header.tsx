import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

export default function Header () {
    return (
        <BottomNavigation
            showLabels
            sx={{backgroundColor: 'primary.dark'}}>
            <BottomNavigationAction sx={{color: 'white'}} label="MAIN"
                                    component={Link}
                                    to="/"/>
            <BottomNavigationAction sx={{color: 'white'}} label="TODOS"
                                    component={Link}
                                    to="/todos"/>

            <BottomNavigationAction sx={{color: 'white'}} label="BLOG"
                                    component={Link}
                                    to="/blog"/>
            <BottomNavigationAction sx={{color: 'white'}} label="REGISTER"
                                    component={Link}
                                    to="/register"/>
            <BottomNavigationAction sx={{color: 'white'}} label="LOGIN"
                                    component={Link}
                                    to="/login"/>
        </BottomNavigation>
    )
}
