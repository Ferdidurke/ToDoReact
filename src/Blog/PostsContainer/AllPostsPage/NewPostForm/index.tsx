import React, {useState} from 'react';
import './styles.sass'
import {blogApi} from "../../../../services/PostService";
import {Button, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/redux-toolkit/store";

function NewPostForm() {
    const [addPost] = blogApi.useAddPostMutation()
    const { user } = useSelector((state: RootState)=> state.auth)
    const [title, setTitle] = useState('')
    const [postText, setPostText] = useState('')

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangePostText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(event.currentTarget.value)
    }

    const submitNewPost = (event: any) => {
        event.preventDefault()
        const post = {
            userId: user.id,
            author: `${user.firstName} ${user.lastName}`,
            title: title,
            body: postText,
            date: new Date()
        }
        addPost(post)
        setPostText('')
        setTitle('')
        document.querySelector('.post-form__container')!.classList.toggle('extended__form-container')
    }

    return (
        <div className='post-form__container'>
            <form className='new-post__form' onSubmit={submitNewPost}>
                <label>Title:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Title' required
                                                    value={title}
                                                    onChange={handleChangeTitle}/>
                <label>Body:</label><textarea required
                                                        value={postText}
                                                        onChange={handleChangePostText}/>
                <Button variant='contained' type='submit'>Send</Button>
            </form>
        </div>
    );
}

export default NewPostForm;