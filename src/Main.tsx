import React, {ReactElement} from "react";
import {BottomNavigation, BottomNavigationAction, Button, ButtonGroup} from "@mui/material";
import {Link} from "react-router-dom";
import RegistrationForm from "./Blog/AuthorisationPage/RegistrationForm";
import Header from "./Header";


export default function Main () : ReactElement {
    return (
        <div>
        <Header/>
            <div className='main__buttons-container'>
                <ButtonGroup>
                    <Button data-testid='test_login-btn' variant='contained' sx={{marginTop: '10px', marginRight: '5px'}}>LOGIN</Button>
                    <Button data-testid='test_register-btn' variant='contained' sx={{marginTop: '10px'}} component={Link} to="/register">REGISTER</Button>
                </ButtonGroup>
            </div>


        </div>
    )
}
