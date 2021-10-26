import React, {ReactElement, useState} from 'react';
import PostForm, {Ipost} from "../Post";
import './styles.sass'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {sortPostsOnAuthorDesc, sortPostsOnDateDesc, sortPostsOnAuthorAsc, sortPostsOnDateAsc} from "../../store/redux-toolkit/blogReducer";
import {Pagination} from "../functions/pagination";




function PostsContainer(): ReactElement {
    const dispatch = useDispatch()
    const { posts } = useSelector((state:RootState) => state.blog)
    const totalPosts = posts.length
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const indexOfLastPage = currentPage * postsPerPage
    const indexOfFirstPage = indexOfLastPage - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const nextPage = (): void => {
         setCurrentPage(prevState => prevState + 1)
    }

    const previousPage = (): void => {
         setCurrentPage(prevState => prevState - 1)
    }

    const sortingPostsOnDateDesc = (): void => {
        const sortedPosts = [...posts]
        sortedPosts.sort((a: { date: string }, b: { date: string }) => Date.parse(b.date) - Date.parse(a.date))
        dispatch(sortPostsOnDateDesc(sortedPosts))
    }

    const sortingPostsOnDateAsc = (): void => {
        const sortedPosts = [...posts]
        sortedPosts.sort((a: { date: string }, b: { date: string }) => Date.parse(a.date) - Date.parse(b.date))
        dispatch(sortPostsOnDateAsc(sortedPosts))

    }

    const sortingPostsOnAuthorDesc = (): void => {
        const sortedPosts = [...posts]
        sortedPosts.sort((a: { id: number }, b: { id: number  }) => b.id - a.id)
        dispatch(sortPostsOnAuthorDesc(sortedPosts))
    }

    const sortingPostsOnAuthorAsc = (): void => {
        const sortedPosts = [...posts]
        sortedPosts.sort((a: { id: number }, b: { id: number  }) => a.id - b.id)
        dispatch(sortPostsOnAuthorAsc(sortedPosts))
    }


    return (
        <div className='blog__posts'>
            <div className='links__container'>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по дате:
                        <button className='sorting-button'  onClick={sortingPostsOnDateAsc}>Убывание</button>
                        <button className='sorting-button'  onClick={sortingPostsOnDateDesc}>Возрастание</button>
                    </div>
                    <div className='links__sorting-buttons__container'>
                        Cортировать по автору:
                        <button className='sorting-button' data-testid='sortAuthorAsc' onClick={sortingPostsOnAuthorAsc}>Убывание</button>
                        <button className='sorting-button' data-testid='sortAuthorDesc' onClick={sortingPostsOnAuthorDesc}>Возрастание</button>
                    </div>
                    <div className='links__pagination__container'>
                        <button onClick={previousPage}>Prev</button>
                        <button onClick={nextPage}>Next</button>
                        <Pagination totalPosts={totalPosts}
                                    postsPerPage={postsPerPage}
                                    paginate={paginate}/>
                    </div>
            </div>
            <div className='posts__container'>
                {
                    currentPosts && currentPosts.map((item: Ipost, index) =>
                    <PostForm key={index}
                                item = {item}/>
                    )
                }
            </div>

        </div>
    );
}

export default PostsContainer;