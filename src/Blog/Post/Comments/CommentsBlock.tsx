import React, {ReactElement, useState} from 'react';
import {blogApi} from "../../../services/PostService";
import {Button, CardActions, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/redux-toolkit/store";
import {IComment, IPost} from "../interfaces/interfaces";
import SingleComment from "./SingleComment";

function CommentsBlock(props: Partial<IPost> ): ReactElement {
    const { data: comments, isLoading } = blogApi.useFetchCommentsQuery(props._id as string)
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [sendComment] = blogApi.useAddCommentMutation()
    const { user } = useSelector((state: RootState) => state.auth)


    const addComment = (): void => {
        setNewComment(true)
    }


    const submitComment = (): void => {
        const comment = {
            userId: user.id,
            postId: props._id,
            author: `${user.firstName} ${user.lastName}`,
            body: commentText
        }
        sendComment(comment)
        setNewComment(false)
        setCommentText('')
    }

    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(e.currentTarget.value)
    }
    return (
        <div>

            {
                isLoading ? (<div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', width: '300px', height: '300px' }}>
                        <CircularProgress />
                    </div>) :

                    (<div>
                        {
                            newComment ? (<textarea style={{width: '100%',
                                                            height: '150px',
                                                            resize: 'none'
                                                             }}
                                                    placeholder='Comment...'
                                                    value={commentText}
                                                    onChange={changeCommentText}
                                >
                                            </textarea>) :
                                (
                                    comments && comments.map((comment: IComment, index: number) => (
                                        <SingleComment comment={comment}
                                                       key={index}
                                        />)
                                    )
                                )
                        }
                        <div className='post-comments__button-container'>
                            <CardActions>
                                {
                                    newComment ? (<Button size='small'
                                                          onClick={submitComment}
                                                          data-testid='submitCommentBtn'>Send
                                    </Button>) : (<Button size='small'
                                                          onClick={addComment}
                                                          data-testid='addCommentBtn'>Add Comment
                                    </Button>)
                                }
                            </CardActions>
                        </div>
                    </div>)
            }

        </div>
    );
}

export default CommentsBlock;