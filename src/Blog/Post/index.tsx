import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useDispatch} from "react-redux";
import Comment, {IComment} from "./comment";
import {Ipost, IUser} from "./interfaces/interfaces";



interface IPostForm {
    item: Ipost,
    user: IUser,
    comments: IComment[],
    remove: (post: Ipost) => void;
    update: (post: Ipost) => void;

}


function PostForm ( {item , user, comments, remove, update} : IPostForm) : ReactElement  {
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()

    const addComment = (): void => {
        setNewComment(true)
    }


    const watchPost = (): void => {
        const id = item.id
    }
    const handleRemove = (e: React.MouseEvent): void => {
        e.preventDefault()
        remove(item)

    }

    const submitComment = (): void => {
        const id: number = item.id
        const text: string = commentText
        const date: string = new Date().toLocaleString()
        setNewComment(false)
        setCommentText('')
    }


    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(e.currentTarget.value)
    }

    return (
        <div className='post' id={item.id.toString()}>
            <button id={item.id.toString()} onClick={handleRemove}>DELETE</button>
            <div className='post-info'>
                <p className='post-info__author'>Автор: </p>
                <p className='post-info__date'>Дата создания: </p>
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
                        newComment ? (<textarea style={{width: '90%', height: '150px'}}
                                             placeholder='Введите текст комментария'
                                             value={commentText}
                                             onChange={changeCommentText}
                                             >
                                </textarea>) :
                            (
                               comments && comments.map((comment: IComment, index: number) => (comment.postId === item.id) ? (<Comment comment={comment}
                                                                                                                                key={index}
                                                                                                                                />) : null)
                            )
                    }
                </div>
                <div className='post-comments__button-container'>
                    {
                        newComment ? (<button style={{width: '100%', height: '100%'}} onClick={submitComment} data-testid='submitCommentBtn'>Отправить</button>) : <button onClick={addComment} data-testid='addCommentBtn'>Добавить комментарий</button>
                    }

                </div>



            </div>
        </div>
    );
}

export default PostForm;