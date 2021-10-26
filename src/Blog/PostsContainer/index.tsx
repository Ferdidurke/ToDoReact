import React from 'react';
import PostForm, {Ipost} from "../Post";
import './styles.sass'
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";

function PostsContainer() {
    const { blog: {posts} } = useSelector((state:RootState) => state)

    return (
        <div className='blog__posts'>
            <div className='links__container'>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по дате:
                        <button className='sorting-button'>1</button>
                        <button className='sorting-button'>1</button>
                    </div>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по автору:
                        <button className='sorting-button'>1</button>
                        <button className='sorting-button'>1</button>
                    </div>
                    <div className='links__pagination-links__container'>
                        <a href='#'> &laquo; </a>
                        <a href='#'> &lt; </a>
                        <a href='#'> &gt; </a>
                        <a href='#'> &raquo; </a>
                    </div>
            </div>
            <div className='posts__container'>
                {
                    posts && posts.map((item: any, index) =>
                    <PostForm key={index}
                                item = {item}/>
                    )
                }
            </div>

        </div>
    );
}

export default PostsContainer;