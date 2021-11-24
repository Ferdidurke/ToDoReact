import React, {ReactElement} from "react";
import './styles.sass'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllPostsPage from "./PostsContainer/AllPostsPage";
import CurrentPostPage from "./PostsContainer/CurrentPostPage";
import Header from "../Header";
import UserCard from "./UserCard";





export function Blog(): ReactElement {

    return (
        <div className='blog'>
            <Header/>
            <div className='blog__head'>
                <div className='header__user-container'>
                    <UserCard/>
                </div>
                <h1 className='blog-header'>BLOG</h1>
            </div>
                <div className='blog__container'>
                    <Router>
                        <Switch>
                            <Route exact path='/blog' component={ AllPostsPage }/>
                            <Route path='/blog/posts/:id' component={ CurrentPostPage }/>
                        </Switch>
                    </Router>
                </div>
        </div>
    )
}