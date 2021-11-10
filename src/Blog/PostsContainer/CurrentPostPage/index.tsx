import React from "react";
import PostForm from "../../Post";
import {blogApi} from "../../../services/PostService";
import {Link, useParams} from "react-router-dom";
import {Box, Button} from "@mui/material";


const CurrentPostPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>()
    const { data: post } = blogApi.useFetchSinglePostQuery(id as string)

    return (
        <Box sx={{ background: '#2c557e',
            minHeight: '600px',
            width: '100%' }}
        >
            <Button sx={{
                width: '300px',
                margin: '40px auto',
                display: 'block',
                textAlign: 'center'
            }}
                    variant='contained' component={ Link } to = '/blog'>GO BACK</Button>
            {
                post ? (<PostForm item={ post }/>) : null
            }
        </Box>
    );
}

export default CurrentPostPage;