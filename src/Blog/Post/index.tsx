import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useSelector} from "react-redux";
import Comment from "./comment";
import {IComment} from "./interfaces/interfaces";
import {IPostForm} from "./interfaces/interfaces";
import {Link, useHistory} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Button, CardActionArea, CardActions} from "@mui/material";
import {RootState} from "../../store/redux-toolkit/store";
import {blogApi} from "../../services/PostService";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import DeleteIcon from '@mui/icons-material/Delete';


function PostForm ({ item } : IPostForm) : ReactElement  {
    const [newComment, setNewComment] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [sendComment] = blogApi.useAddCommentMutation()
    const [deletePost] = blogApi.useDeletePostMutation()
    const { data: comments } = blogApi.useFetchCommentsQuery(item._id)
    const { user } = useSelector((state: RootState) => state.auth)
    const history = useHistory()



    const addComment = (): void => {
        setNewComment(true)
    }



    const handleRemovePost = (e: React.MouseEvent): void => {
        e.preventDefault()
        deletePost(item)

    }

    const submitComment = (): void => {
        const comment = {
            userId: user.id,
            postId: item._id,
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

    const getId = (): string => {
        const id = `/blog/posts/${item._id}`
        return id
    }


    return (
        <div>
            <Card sx={{ maxWidth: '90%',
                margin: '10px auto' }}
                id={ item._id.toString() }>
                <CardActionArea component={Link} to={ getId() }>
                    <CardContent>
                        <Button sx={{ float: 'right' }}
                                id={ item._id.toString() }
                                onClick={ handleRemovePost }
                                size='large'>
                                        <DeleteIcon/>
                                </Button>
                            <Typography sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div">
                                                    Date: { new Date(item.date).toLocaleString() }
                            </Typography>
                            <Typography sx={{ marginBottom: '20px' }}
                                        gutterBottom
                                        variant="h4"
                                        component="div">{ item.title }
                            </Typography>
                            <Typography sx={{ marginBottom: '20px' }}
                                        gutterBottom
                                        variant="subtitle2"
                                        component="div"> { item.author }

                        </Typography>
                        <Typography variant="body2"
                                    color="text.secondary"
                                    component="div">{ item.body }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Accordion>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon /> }
                    >
                        <Typography
                            component="div">Comments
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {
                                                newComment ? (<textarea style={{ width: '90%', height: '150px' }}
                                                                     placeholder='Введите текст комментария'
                                                                     value={ commentText }
                                                                     onChange={ changeCommentText }
                                                                     >
                                                        </textarea>):
                                                    (
                                                       comments && comments.map((comment: IComment, index: number) => (comment.postId === item._id) ? ( <Comment comment={ comment }
                                                                                                                                                        key={ index }
                                                                                                                                                        />) : null)
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
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Card>
        </div>
    )
}

export default PostForm;