import React from "react";

interface IComment {
    counter: number,
    text: string,
    date: string
}


const Comment : React.FC<IComment> = (props: IComment)  => {
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