import React, {ReactElement} from "react";
import Main from "../Main";
import './styles.sass'
import Sidebar from "./Sidebar";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllPostsPage from "./PostsContainer/AllPostsPage";
import CurrentPostPage from "./PostsContainer/CurrentPostPage";



export function Blog(): ReactElement {


    return (
        <div className='blog'>
            <Main/>
            <div className='blog__head'>
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