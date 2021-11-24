import React, {ReactElement, useState} from 'react';
import PostForm from "../../Post";
import './styles.sass'
import {IPost} from "../../Post/interfaces/interfaces";
import {blogApi} from "../../../services/PostService";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NewPostForm from "./NewPostForm";
import {Box, Button, ButtonGroup, CircularProgress} from "@mui/material";
import {IParams, userApi} from "../../../services/UserService";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/redux-toolkit/store";





function AllPostsPage(): ReactElement {
    userApi.useGetUserQuery(null)
    const [params, setParams] = React.useState<Partial<IParams>> ({ skip: 0, limit: 5 })
    const { data: postsData, isFetching, error  } = blogApi.useFetchPostsQuery(params, {
        refetchOnMountOrArgChange: true
    })
    const [addNewPost, setAddNewPost] = useState(false)
    const { isAuthenticated } = useSelector((state: RootState) => state.auth)




    const handleAddPost = () => {
        setAddNewPost(true)
        setTimeout(() => document.querySelector('.post-form__container')!.classList.toggle('extended__form-container'), 50)

    }

    const prevPage = () => {
        const page = params.skip as number - 5
        setParams({ skip: page, limit: 5, sort: params.sort })
    }

    const nextPage = () => {
        const page = params.skip as number + 5
        setParams({ skip: page, limit: 5, sort: params.sort })
    }

    const sortOnAuthorAsc = () => {
        setParams({ limit: params.limit, skip: params.skip, sort: { author: 'asc' } })
    }

    const sortOnAuthorDesc = () => {
        setParams({ limit: params.limit, skip: params.skip, sort: { author: 'desc' } })
    }

    const sortOnDateAsc = () => {
        setParams({ limit: params.limit, skip: params.skip, sort: { date: 'asc' } })
    }

    const sortOnDateDesc = () => {
        setParams({ limit: params.limit, skip: params.skip, sort: { date: 'desc'} })
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
                    marginBottom: '15px'
                    }}>
                        <div className='links__sorting-buttons__container'>
                            <p>Sort on date:</p>
                            <ButtonGroup sx={{ marginLeft: '5px' }} variant='contained'>
                                <Button onClick={ sortOnDateAsc }><ArrowDownwardIcon /></Button>
                                <Button onClick={ sortOnDateDesc }><ArrowUpwardIcon /></Button>
                            </ButtonGroup>
                        </div>
                        <div className='links__sorting-buttons__container'>
                            <p>Sort on author:</p>
                            <ButtonGroup sx={{ marginLeft: '5px' }} variant='contained'>
                                <Button data-testid='sortAuthorAsc' onClick={ sortOnAuthorAsc }><ArrowDownwardIcon /></Button>
                                <Button data-testid='sortAuthorDesc' onClick={ sortOnAuthorDesc }><ArrowUpwardIcon /></Button>
                            </ButtonGroup>
                        </div>
                        <Box className='links__pagination__container'>
                            {
                                postsData ? (
                                    <ButtonGroup variant='contained' sx={{ marginRight: '10px' }}>
                                        <Button variant='contained' disabled={ (params.skip as number) < 5 }
                                                onClick={prevPage}>PREV</Button>
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
                                            <p>{ Math.ceil(params.skip as number / 5 + 1) } / { Math.ceil(postsData.counter / (params.limit as number)) }</p>
                                        </Box>
                                        <Button variant='contained'
                                                                 disabled={ (params.skip as number) >= postsData.counter - (params.limit as number) }
                                                                 onClick={ nextPage }>NEXT</Button>)
                                    </ButtonGroup>) : null
                            }
                        </Box>
                </Box>
                <div className='posts__container'>
                    {
                        isAuthenticated && <Button sx={{
                            width: '300px',
                            margin: '40px auto',
                            display: 'block'
                        }} variant='contained' onClick={handleAddPost}>NEW POST</Button>
                    }
                            {
                                addNewPost ? (
                                <NewPostForm/>   ) : null
                            }

                    { error && <h1>Произошла ошибка</h1> }
                    {
                        isFetching ? (<div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', width: '300px', height: '300px' }}>
                            <CircularProgress />
                        </div>) : (postsData && postsData.posts.map((item: IPost, index: number) =>
                        <PostForm   key={index}
                                    item={item}
                                    />)
                        )
                    }
                </div>
            </Box>

        );

}

export default AllPostsPage;