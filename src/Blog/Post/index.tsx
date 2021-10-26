import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useDispatch} from "react-redux";
import {addNewComment} from "../../store/redux-toolkit/blogReducer";
import Comment from "./comment";

export interface Ipost {
    id: number
    date: Date
    title: string
    body: string
    comments: [ {commentText: string, commentDate: string} ]
}

interface IPostForm {
    item: Ipost
}



function PostForm ( {item} : IPostForm) : ReactElement  {
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()

    const addComment = (): void => {
        setComment(true)
    }

    const submitComment = (): void => {
        const id: number = item.id
        const text: string = commentText
        const date: string = new Date().toLocaleString()
        dispatch(addNewComment({id, text, date}))
        setComment(false)
        setCommentText('')
    }


    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(e.currentTarget.value)
    }


    return (
        <div className='post' id={item.id.toString()}>
            <div className='post-info'>
                <p className='post-info__author'>Автор: {item.id}</p>
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
            <div className='post-comments__container'>
                <div className='post-comments__title'>
                    <p className='post-comments__text'>Комментарии:</p>
                </div>

                <div className='post-comments__content'>
                    {
                        comment ? (<textarea style={{width: '90%', height: '150px'}}
                                             placeholder='Введите текст комментария'
                                             value={commentText}
                                             onChange={changeCommentText}
                                             >
                                </textarea>) :
                            (
                                item.comments.map((comment, index) => <Comment text={comment.commentText}
                                                                                    date={comment.commentDate}
                                                                                    key={index}
                                                                                    counter={index}/>)
                            )
                    }
                </div>
                <div className='post-comments__button-container'>
                    {
                        comment ? (<button style={{width: '100%', height: '100%'}} onClick={submitComment} data-testid='submitCommentBtn'>Отправить</button>) : <button onClick={addComment} data-testid='addCommentBtn'>Добавить комментарий</button>
                    }

                </div>



            </div>
        </div>
    );
}

export default PostForm;