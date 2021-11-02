import React, {useState} from 'react';
import './styles.sass'
import {blogApi} from "../../../../services/PostService";
import {Button, TextField} from "@mui/material";
import {userApi} from "../../../../services/UserService";

function NewPostForm() {
    const [addPost] = userApi.useAddPostMutation()
    const [authorName, setAuthorName] = useState('')
    const [title, setTitle] = useState('')
    const [authorEmail, setAuthorEmail] = useState('')
    const [postText, setPostText] = useState('')

    const handleChangeAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(event.currentTarget.value)
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeAuthorEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorEmail(event.currentTarget.value)
    }

    const handleChangePostText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(event.currentTarget.value)
    }

    const submitNewPost = (event: any) => {
        event.preventDefault()
        const post = {
            name: authorName,
            email: authorEmail,
            title: title,
            body: postText,
            date: new Date().toLocaleString()
        }
        addPost(post)
        setAuthorName('')
        setPostText('')
        setTitle('')
        setAuthorEmail('')
        document.querySelector('.post-form__container')!.classList.toggle('extended__form-container')
    }

    return (
        <div className='post-form__container'>
            <form className='new-post__form' onSubmit={submitNewPost}>
                <label>Введите имя:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Имя' required
                                                    value={authorName}
                                                    onChange={handleChangeAuthorName}/>
                <label>Введите заголовок:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Заголовок' required
                                                    value={title}
                                                    onChange={handleChangeTitle}/>

                <label>Введите e-mail:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='E-mail'   type='email'
                                                value={authorEmail}
                                                onChange={handleChangeAuthorEmail} required/>
                <label>Текст:</label><textarea required
                                                        value={postText}
                                                        onChange={handleChangePostText}/>
                <Button variant='contained' type='submit'>Отправить</Button>
            </form>
        </div>
    );
}

export default NewPostForm;