import React, {ReactElement, useState} from 'react';
import PostForm from "../../Post";
import './styles.sass'
import {IPost, IUser, IComment} from "../../Post/interfaces/interfaces";
import {blogApi} from "../../../services/PostService";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NewPostForm from "./NewPostForm";
import {Box, Button, ButtonGroup, CircularProgress} from "@mui/material";

export interface IAllPostsProps {
    posts: IPost[]
    users: IUser[]
    comments: IComment[]
    params: {
        start: number,
        limit: number
    }
    handleRemove(post: IPost): void
    handleUpdate(): void
}

function AllPostsPage(props: IAllPostsProps): ReactElement {

    const [params, setParams] = useState({start: 0, limit: 10})
    const { data: users } = blogApi.useFetchAuthorsQuery(10)
    const { data: posts, isLoading, error  } = blogApi.useFetchPostsQuery(params)
    const { data: comments } = blogApi.useFetchCommentsQuery(params)
    const [deletePost] = blogApi.useDeletePostMutation()
    const [addNewPost, setAddNewPost] = useState(false)

    const handleRemove = (item: IPost) => {
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

    return (

            <Box className='blog__posts'>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.dark',
                    borderTop: '2px solid gray',
                    }}>
                        <div className='links__sorting-buttons__container'>
                            <p>Cортировать по дате:</p>
                            <ButtonGroup sx={{marginLeft: '5px'}} variant='contained'>
                                <Button><ArrowDownwardIcon /></Button>
                                <Button><ArrowUpwardIcon /></Button>
                            </ButtonGroup>
                        </div>
                        <div className='links__sorting-buttons__container'>
                            <p>Cортировать по автору:</p>
                            <ButtonGroup sx={{marginLeft: '5px'}} variant='contained'>
                                <Button data-testid='sortAuthorAsc'><ArrowDownwardIcon /></Button>
                                <Button data-testid='sortAuthorDesc'><ArrowUpwardIcon /></Button>
                            </ButtonGroup>
                        </div>
                        <Box className='links__pagination__container'>
                            <ButtonGroup variant='contained' sx={{marginRight: '10px'}}>
                                <Button variant='contained' disabled={(params.start < 10)} onClick={prevPage}>PREV</Button>
                                <Box sx={{
                                    width: '50px',
                                    height: '25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'primary.dark',
                                    padding: '5px',
                                    color: 'white',
                                    fontFamily: 'Roboto',
                                }}>
                                        <p>{params.start/10+1}/10</p>
                                </Box>
                                <Button variant='contained' disabled={(params.start >= 90)} onClick={nextPage}>NEXT</Button>
                            </ButtonGroup>
                        </Box>
                </Box>
                <div className='posts__container'>
                    <Button sx={{
                        width: '300px',
                        margin: '40px auto',
                        display: 'block'
                    }} variant='contained' onClick={handleAddPost}>NEW POST</Button>
                    {
                        addNewPost ? (
                                   <NewPostForm/>   ) : null
                    }
                    {isLoading && (<div style={{display: 'flex', margin: '0 auto', justifyContent: 'center', width: '300px', height: '300px'}}>
                        <CircularProgress />
                        </div>)}
                    {error && <h1>Произошла ошибка</h1>}
                    {
                        users && posts && comments && posts.map((item: IPost, index: number) =>
                        <PostForm  remove={handleRemove} update={handleUpdate} key={index}
                                    item={item}
                                    users={users}
                                    comments={comments}/>
                        )
                    }
                </div>
            </Box>

    );
}

export default AllPostsPage;