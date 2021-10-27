import React, {ReactElement, useEffect, useState} from 'react';
import PostForm from "../Post";
import './styles.sass'

import {useAppDispatch, useAppSelector} from "../../store/redux-toolkit/hooks";
import {Ipost} from "../Post/interfaces/interfaces";

import {blogApi} from "../services/PostService";
import {Pagination} from "../functions/pagination";



function PostsContainer(): ReactElement {

    const dispatch = useAppDispatch()

    const [params, setParams] = useState({start: 20, limit: 10})
        // if (params.start <= 10) {
        //     document.getElementById('999')!.setAttribute('disabled', 'true')
        // } else document.getElementById('999')!.setAttribute('disabled', 'false')
        //
        // if (params.start >= 90) {
        //     document.getElementById('888')!.setAttribute('disabled', 'true')
        // } else document.getElementById('888')!.setAttribute('disabled', 'false')

    const { data: posts, isLoading, error  } = blogApi.useFetchPostsQuery(params)
    const { data: users } = blogApi.useFetchAuthorsQuery(params)
    const { data: comments } = blogApi.useFetchCommentsQuery(params.limit*5)
    const [addPost] = blogApi.useAddPostMutation()
    const [deletePost] = blogApi.useDeletePostMutation()
    const [page, setPage] = useState(1)
    const totalPosts = 100
    const [currentPage, setCurrentPage] = useState(1)
    // const indexOfLastPage = currentPage * limit
    // const indexOfFirstPage = indexOfLastPage - limit
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleRemove = (item: Ipost) => {
            deletePost(item)
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
            body: 'qwdadasdasdwd'
        }
        addPost(post)
    }

    return (
        <div className='blog__posts'>
            <div className='links__container'>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по дате:
                        <button id='999' className='sorting-button' onClick={prevPage}>-</button>
                        <button id='888' className='sorting-button' onClick={nextPage}>+</button>
                    </div>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по автору:
                        <button className='sorting-button' data-testid='sortAuthorAsc'>Убывание</button>
                        <button className='sorting-button' data-testid='sortAuthorDesc'>Возрастание</button>
                    </div>
                    <div className='links__pagination__container'>
                        <button onClick={handleAdd}>NEW POST</button>
                        <Pagination paginate={paginate}
                                    totalPosts={totalPosts}
                                    postsPerPage={params.limit}/>
                    </div>
            </div>
            <div className='posts__container'>
                {isLoading && <h1>Идет загрузка</h1>}
                {error && <h1>Произошла ошибка</h1>}
                {

                    users && posts && posts.map((item: Ipost, index: number) =>
                    <PostForm  remove={handleRemove} update={handleUpdate} key={index}
                                item={item}
                                user={users[item.id-1]}
                                comments={comments}/>
                    )
                }
            </div>

        </div>
    );
}

export default PostsContainer;