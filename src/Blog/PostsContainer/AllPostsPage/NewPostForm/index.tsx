import React, {useState} from 'react';
import './styles.sass'
import {blogApi} from "../../../services/PostService";

function NewPostForm() {
    const [addPost] = blogApi.useAddPostMutation()
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
                <label>Введите имя:</label><input required
                                                 value={authorName}
                                                    onChange={handleChangeAuthorName}></input>
                <label>Введите заголовок:</label><input required
                                                    value={title}
                                                    onChange={handleChangeTitle}></input>

                <label>Введите e-mail:</label><input type='email'
                                                     value={authorEmail}
                                                     onChange={handleChangeAuthorEmail} required></input>
                <label>Текст:</label><textarea required
                                                     value={postText}
                                                    onChange={handleChangePostText}></textarea>
                <button className='blog__button' type='submit'>Отправить</button>
            </form>
        </div>
    );
}

export default NewPostForm;