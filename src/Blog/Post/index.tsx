import React from 'react';
import './styles.sass'

export interface Ipost {
    author: string | number
    date: string
    title: string
    body: string
    comment: string
}



function PostForm (props : any) {

    const randomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const date = randomDate(new Date(2012, 0, 1), new Date());

    return (
        <div className='post'>
            <div className='post-info'>
                <p className='post-info__author'>Автор: {props.item.id}</p>
                <p className='post-info__date'>Дата создания: {date.toLocaleString()}</p>
            </div>
            <div className='post-title'>
                <p className='post-title__text'>Заголовок:</p>
                <p className='post-title__text'>{props.item.title}</p>
            </div>
            <div className='post-content'>
                <p className='post-content__text'>Содержание:</p>
                <p className='post-content__text'>{props.item.body}</p>
            </div>
            <div className='post-comments__container'>
                <p className='post-comments__text'>Комментарии:</p>
                <p className='post-comments__text'>{props.comment}</p>
            </div>
        </div>
    );
}

export default PostForm;