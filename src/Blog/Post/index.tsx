import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useDispatch, useSelector} from "react-redux";
import Comment from "./comment";
import {IComment} from "./interfaces/interfaces";
import {IPostForm} from "./interfaces/interfaces";
import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {RootState} from "../../store/redux-toolkit/store";
import {blogApi} from "../../services/PostService";


function PostForm ( {item , users, comments, remove, update} : IPostForm) : ReactElement  {
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [sendComment] = blogApi.useAddCommentMutation()
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const addComment = (): void => {
        setNewComment(true)
    }

    const handleRemove = (e: React.MouseEvent): void => {
        e.preventDefault()
        remove(item)

    }

    const submitComment = (): void => {
        const comment = {
            userId: user.id,
            postId: item._id,
            author: `${user.firstName} ${user.lastName}`,
            body: commentText
        }
        sendComment(comment)
        setNewComment(false)
        setCommentText('')
    }

    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(e.currentTarget.value)
    }

    const getId = () => {
        const id = `/blog/posts/${item._id}`
        return id
    }

    const handleExtendedCommentsBlock = (e: React.MouseEvent) => {
        const targetBlock = (e.target as any).nextSibling
        targetBlock!.classList.toggle('extended__container')
    }

    return (
            <Box
                sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'primary.light',
                padding: '5px',
                borderRadius: '5px',
                margin: '10px auto',
                textDecoration: 'none',
            }}
            id={item._id.toString()}>
                <Button id={item._id.toString()} onClick={handleRemove} variant='contained'>DELETE</Button>
                <Link to = {getId()}>postpage</Link>
                <div className='post-info'>
                    <p className='post-info__author'>Автор:
                        {
                            users && users.map((user, index) => (user._id === item.userId) ? (` ${user.firstName} ${user.lastName}`) : null)
                        }
                    </p>
                    <p className='post-info__date'>Дата создания: {item.date.toLocaleString()}</p>
                </div>
                <div className='post-title'>
                    <p className='post-title__text'>Заголовок:</p>
                    <p className='post-title__text'>{item.title}</p>
                </div>
                <div className='post-content'>
                    <p className='post-content__text'>Содержание:</p>
                    <p className='post-content__text'>{item.body}</p>
                </div>
                <Button variant='contained' onClick={handleExtendedCommentsBlock}>Комментарии</Button>
                <div className='post-comments__container'>
                    <div className='post-comments__title'>
                        <p className='post-comments__text'>Комментарии:</p>
                    </div>
                    <div className='post-comments__content'>
                        {
                            newComment ? (<textarea style={{width: '90%', height: '150px'}}
                                                 placeholder='Введите текст комментария'
                                                 value={commentText}
                                                 onChange={changeCommentText}
                                                 >
                                    </textarea>):
                                (
                                   comments && comments.map((comment: IComment, index: number) => (comment.postId === item._id) ? ( <Comment comment={comment}
                                                                                                                                    key={index}
                                                                                                                                    />) : null)
                                )
                        }
                    </div>
                    <div className='post-comments__button-container'>
                        {
                            newComment ? (<Button variant='contained' onClick={submitComment} data-testid='submitCommentBtn'>Отправить</Button>) : <Button variant='contained' onClick={addComment} data-testid='addCommentBtn'>Добавить комментарий</Button>
                        }
                    </div>
                </div>
            </Box>
    );
}

export default PostForm;