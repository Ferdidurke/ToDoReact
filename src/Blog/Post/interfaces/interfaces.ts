export interface IPost {
    _id: string
    userId: number
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
    id: number,
    date: Date | string
    author: string
    body: string
}

export interface ICommentForm {
    comment: IComment
}