import React from "react";
import PostForm from "../../Post";
import {blogApi} from "../../services/PostService";
import {IAllPostsProps} from "../AllPostsPage";
import {Ipost} from "../../Post/interfaces/interfaces";
import {Link, useParams} from "react-router-dom";



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

    const handleRemove = (item: Ipost) => {
        deletePost(item)
    }

    const handleUpdate = () => {
        console.log(1)
    }

    return (
        <div>
            <button className='blog__button' style={
                {margin: '0 auto',
                display: 'block'
                }
            }><Link to = '/blog' style={{textDecoration: 'none', color: 'gold'}}>GO BACK</Link></button>
            {
                post && users && comments ? (<PostForm remove={handleRemove} update={handleUpdate}
                                                         item={post}
                                                         users={users}
                                                         comments={comments}/>) : null
            }
        </div>
    );
}

export default CurrentPostPage;