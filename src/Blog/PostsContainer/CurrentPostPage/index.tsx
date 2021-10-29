import React from "react";
import PostForm from "../../Post";
import {blogApi} from "../../services/PostService";
import {IAllPostsProps} from "../AllPostsPage";
import {IPost} from "../../Post/interfaces/interfaces";
import {Link, useParams} from "react-router-dom";
import {Box, Button} from "@mui/material";


const CurrentPostPage: React.FC<Partial<IAllPostsProps>> = (props) =>{
    const { id } = useParams<{id?: string}>()

    const params = {
        start: Number(id)-1,
        limit: 1
    }

    const { data: post } = blogApi.useFetchSinglePostQuery(Number(id))
    const { data: users } = blogApi.useFetchAuthorsQuery(10)
    const { data: comments } = blogApi.useFetchCommentsQuery(params)
    const [deletePost] = blogApi.useDeletePostMutation()

    const handleRemove = (item: IPost) => {
        deletePost(item)
    }

    const handleUpdate = () => {
        console.log(1)
    }

    return (
        <Box sx={{background: '#2c557e', minHeight: '600px'}}>
            <Button sx={{
                width: '300px',
                margin: '40px auto',
                display: 'block',
                textAlign: 'center'
            }}
                    variant='contained' component={Link}  to = '/blog'>GO BACK</Button>
            {
                post && users && comments ? (<PostForm remove={handleRemove} update={handleUpdate}
                                                         item={post}
                                                         users={users}
                                                         comments={comments}/>) : null
            }
        </Box>
    );
}

export default CurrentPostPage;