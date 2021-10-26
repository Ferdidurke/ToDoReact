import React, {useState} from 'react';
import './styles.sass'
import {useDispatch} from "react-redux";
import {addNewComment} from "../../store/redux-toolkit/blogReducer";
import Comment from "./comment";

export interface Ipost {
    id: number
    date: Date
    title: string
    body: string
    comments: []
}

interface IPostForm {
    item: Ipost
}



function PostForm ( {item} : IPostForm) {
    const [comment, setComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()

    const addComment = () => {
        setComment(true)
    }

    const submitComment = () => {
        const id = item.id
        const text = commentText
        const date = new Date().toLocaleString()
        dispatch(addNewComment({id, text, date}))
        setComment(false)
        setCommentText('')
    }


    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                                item.comments.map((comment: any, index) => <Comment text={comment.commentText}
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