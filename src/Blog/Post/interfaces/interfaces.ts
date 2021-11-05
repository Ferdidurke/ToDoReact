export interface IPost {
    _id: number | string
    userId: number
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
    users: IUser[],
    comments: IComment[] | undefined,
    remove: (post: IPost) => void | undefined
    update: (post: IPost) => void | undefined

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