import React from "react";

const Comment = (props: any) => {
    console.log(props)
    return (
    <div className='comment'>
        <div className='comment-number'>
            {props.counter+1}.
        </div>
        <div className='comment-container'>
                <div className='comment-author'>
                    Автор:
                </div>
                <div className='comment-body'>
                    Текст комментария: {props.text}
                </div>
                <div className='comment-date'>
                    Дата комментария: {props.date}
                </div>
        </div>
    </div>
    )
}

export default Comment