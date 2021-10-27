import React, {ReactElement} from "react";

export interface IComment {
    postId: number,
    id: number,
    name: string
    email: string
    body: string
}

interface ICommentForm {
    comment: IComment
}

const Comment = ({comment}: ICommentForm)  => {

    return (
    <div className='comment'>
        <div className='comment-number'>

        </div>
        <div className='comment-container'>
                <div className='comment-author'>
                    Автор: {comment.name}
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