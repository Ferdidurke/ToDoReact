import React, {ReactElement} from "react";
import Main from "../Main";
import './styles.sass'
import Sidebar from "./Sidebar";
import PostsContainer from "./PostsContainer";
import {useDispatch, } from "react-redux";







export function Blog(): ReactElement {

    const dispatch = useDispatch()

    return (
        <div className='blog'>
            <Main/>
            <div className='blog__head'>
                <h1 className='blog-header'>BLOG</h1>
            </div>
                <div className='blog__container'>
                    <Sidebar/>
                    <PostsContainer />
                </div>
        </div>
    )
}