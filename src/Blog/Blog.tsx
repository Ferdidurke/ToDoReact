import {render} from "react-dom";
import React, {useState} from "react";
import Main from "../Main";
import './styles.sass'
import Sidebar from "./Sidebar";
import PostsContainer from "./PostsContainer";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "../store/redux-toolkit/blogReducer";







export function Blog (props: any) {




    const dispatch = useDispatch()
    dispatch(getData())






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