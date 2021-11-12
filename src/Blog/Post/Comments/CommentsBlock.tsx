import React, {ReactElement, useState} from 'react';
import {blogApi} from "../../../services/PostService";
import {Button, CardActions, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/redux-toolkit/store";
import {IComment, IPost} from "../interfaces/interfaces";
import SingleComment from "./SingleComment";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout} from "../../../store/redux-toolkit/reducers/authReducer";

function CommentsBlock(props: Partial<IPost> ): ReactElement {
    const { data: comments, isLoading, error: fetchCommentsError } = blogApi.useFetchCommentsQuery(props._id as string)
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [sendComment, { error: mutationCommetsError }] = blogApi.useAddCommentMutation()
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    if ((fetchCommentsError || mutationCommetsError) && ((fetchCommentsError as FetchBaseQueryError).status === 401 || (mutationCommetsError as FetchBaseQueryError).status === 401)) {
        dispatch(logout())
    }


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
                isLoading ? (<div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', width: '300px', height: '150px' }}>
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
                        {
                            isAuthenticated && (
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
                            )
                        }

                    </div>)
            }

        </div>
    );
}

export default CommentsBlock;