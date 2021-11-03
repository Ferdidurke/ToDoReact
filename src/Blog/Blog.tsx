import React, {ReactElement} from "react";
import Main from "../Main";
import './styles.sass'
import Sidebar from "./Sidebar";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AllPostsPage from "./PostsContainer/AllPostsPage";
import CurrentPostPage from "./PostsContainer/CurrentPostPage";
import {Button} from "@mui/material";
import RegistrationForm from "./AuthorisationPage/RegistrationForm";
import Header from "../Header";



export function Blog(): ReactElement {


    return (
        <div className='blog'>
            <Header/>
            <div className='blog__head'>
                <div className='header__user-container'>
                </div>
                <h1 className='blog-header'>BLOG</h1>
            </div>
                <div className='blog__container'>
                    <Sidebar/>
                    <Router>
                        <Switch>
                            <Route exact path='/blog' component={AllPostsPage}/>
                            <Route path='/blog/posts/:id' component={CurrentPostPage}/>
                        </Switch>
                    </Router>
                </div>
        </div>
    )
}