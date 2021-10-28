import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useDispatch} from "react-redux";
import Comment, {IComment} from "./comment";
import {Ipost, IUser} from "./interfaces/interfaces";
import {Link} from "react-router-dom";




interface IPostForm {
    item: Ipost,
    users: IUser[],
    comments: IComment[],
    remove: (post: Ipost) => void | undefined
    update: (post: Ipost) => void | undefined

}


function PostForm ( {item , users, comments, remove, update} : IPostForm) : ReactElement  {
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()
    const addComment = (): void => {
        setNewComment(true)
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

    const getId = () => {
        const id = `/blog/posts/${item.id}`
        return id
    }

    const handleExtendedCommentsBlock = (e: React.MouseEvent) => {
        const targetBlock = (e.target as any).nextSibling
        targetBlock!.classList.toggle('extended__container')
    }

    return (
            <div className='post' id={item.id.toString()}>
                <button id={item.id.toString()} onClick={handleRemove} className='blog__button'>DELETE</button>
                <Link to = {getId()}>postpage</Link>
                <div className='post-info'>
                    <p className='post-info__author'>Автор:
                        {
                            users && users.map((user, index) => (user.id === item.userId) ? (user.name) : null)
                        }
                    </p>
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
                <button className='blog__button' onClick={handleExtendedCommentsBlock}>Комментарии</button>
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
                                   comments && comments.map((comment: IComment, index: number) => (comment.postId === item.id) ? ( <Comment comment={comment}
                                                                                                                                    key={index}
                                                                                                                                    />) : null)

                                )
                        }
                    </div>
                    <div className='post-comments__button-container'>
                        {
                            newComment ? (<button style={{width: '100%', height: '100%'}} onClick={submitComment} data-testid='submitCommentBtn' className='blog__button'>Отправить</button>) : <button onClick={addComment} data-testid='addCommentBtn' className='blog__button'>Добавить комментарий</button>
                        }

                    </div>



                </div>
            </div>
    );
}

export default PostForm;