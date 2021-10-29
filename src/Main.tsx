import React, {ReactElement} from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {Link} from "react-router-dom";


export default function Main () : ReactElement {
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
        </BottomNavigation>
    )
}
