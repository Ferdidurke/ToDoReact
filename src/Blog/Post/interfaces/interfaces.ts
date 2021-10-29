export interface IPost {
    id: number
    userId: number
    title: string
    date: string
    body: string
    comments: string[]
}

export interface IUser {
    id: number
    name: string
}

export interface IPostForm {
    item: IPost,
    users: IUser[],
    comments: IComment[],
    remove: (post: IPost) => void | undefined
    update: (post: IPost) => void | undefined

}

export interface IComment {
    postId: number,
    id: number,
    name: string
    email: string
    body: string
}

export interface ICommentForm {
    comment: IComment
}