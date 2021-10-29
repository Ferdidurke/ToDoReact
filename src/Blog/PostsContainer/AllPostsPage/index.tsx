import React, {ReactElement, useState} from 'react';
import PostForm from "../../Post";
import './styles.sass'
import {Ipost, IUser} from "../../Post/interfaces/interfaces";
import {blogApi} from "../../services/PostService";
import {Pagination} from "../../functions/pagination";


import {IComment} from "../../Post/comment";
import NewPostForm from "./NewPostForm";

export interface IAllPostsProps {
    posts: Ipost[]
    users: IUser[]
    comments: IComment[]
    params: {
        start: number,
        limit: number
    }
    handleRemove(post: Ipost): void
    handleUpdate(): void
}



function AllPostsPage(props: IAllPostsProps): ReactElement {

    const [params, setParams] = useState({start: 0, limit: 10})
    const { data: posts, isLoading, error  } = blogApi.useFetchPostsQuery(params)
    const { data: users } = blogApi.useFetchAuthorsQuery(10)
    const { data: comments } = blogApi.useFetchCommentsQuery(params)
    const [addPost] = blogApi.useAddPostMutation()
    const [deletePost] = blogApi.useDeletePostMutation()
    const [addNewPost, setAddNewPost] = useState(false)

    const totalPosts = 100
    const [currentPage, setCurrentPage] = useState(1)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    const handleRemove = (item: Ipost) => {
        deletePost(item)
    }



    const handleAddPost = () => {
        setAddNewPost(true)
        setTimeout(() => document.querySelector('.post-form__container')!.classList.toggle('extended__form-container'), 50)

    }

    const prevPage = () => {
        const counter = params.start - 10
        setParams({start: counter, limit: 10})
    }

    const nextPage = () => {
        const counter = params.start + 10
        setParams({start: counter, limit: 10})
    }

    const handleUpdate = () => {
        console.log(1)
    }

    const handleAdd = () => {
        const post = {
            title: '1111',
            body: '',
            id: 1,
            userId: 1,
            date: '1111',
            comments: []
        }
        addPost(post)
    }

    return (

            <div className='blog__posts'>
                <div className='links__container'>
                        <div className='links__sorting-buttons__container'>
                            Cортировать по дате:
                            <button className='blog__button'>-</button>
                            <button className='blog__button'>+</button>
                        </div>
                        <div className='links__sorting-buttons__container'>
                            Cортировать по автору:
                            <button className='blog__button' data-testid='sortAuthorAsc'>Убывание</button>
                            <button className='blog__button' data-testid='sortAuthorDesc'>Возрастание</button>
                        </div>

                        <div className='links__pagination__container'>
                            <button className="blog__button" onClick={handleAddPost}>NEW POST</button>
                            {/*<Pagination paginate={paginate}*/}
                            {/*            totalPosts={totalPosts}*/}
                            {/*            postsPerPage={params.limit}/>*/}
                            <button className='blog__button' disabled={(params.start < 10)} onClick={prevPage}>PREV</button>
                            <div className='page-number__container'><p>{params.start/10+1}/10</p></div>
                            <button className='blog__button' disabled={(params.start >= 90)} onClick={nextPage}>NEXT</button>

                        </div>
                </div>

                <div className='posts__container'>
                    {
                        addNewPost ? (
                                   <NewPostForm/>   ) : null
                    }
                    {isLoading && <h1>Идет загрузка</h1>}
                    {error && <h1>Произошла ошибка</h1>}
                    {

                        users && posts && comments && posts.map((item: Ipost, index: number) =>
                        <PostForm  remove={handleRemove} update={handleUpdate} key={index}
                                    item={item}
                                    users={users}
                                    comments={comments}/>
                        )
                    }
                </div>

            </div>

    );
}

export default AllPostsPage;