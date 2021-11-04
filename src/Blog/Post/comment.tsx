import React from "react";
import {ICommentForm} from "./interfaces/interfaces";


const Comment = ({comment}: ICommentForm)  => {
    return (
    <div className='comment'>
        <div className='comment-number'>

        </div>
        <div className='comment-container'>
                <div className='comment-author'>
                    Автор: {comment.author}
                </div>
                <div className='comment-body'>
                    Текст комментария: {comment.body}
                </div>
                <div className='comment-date'>
                    Дата комментария:
                </div>
        </div>
    </div>
    )
}

export default Comment