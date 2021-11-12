export interface IPostData {
    posts: IPost[]
    counter: number
}


export interface IPost {
    _id: string
    userId: string
    author: string
    title: string
    date: string | Date
    body: string
    comments: string[]

}

export interface IUser {
    _id: number | string,
    firstName: string,
    lastName: string,
}

export interface IPostForm {
    item: IPost,
}

export interface IComment {
    postId: number | string
    userId: number | string
    _id: string,
    date: Date | string
    author: string
    body: string
}

export interface ICommentForm {
    comment: IComment
}