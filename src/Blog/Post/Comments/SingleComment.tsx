import React, {ReactElement} from "react";
import {ICommentForm} from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/redux-toolkit/store";
import {blogApi} from "../../../services/PostService";


const SingleComment = ({ comment }: ICommentForm) : ReactElement  => {
    const { user } = useSelector((state: RootState) => state.auth)
    const [deleteComment] = blogApi.useDeleteCommentMutation()

    const handleRemoveComment = () => {
        deleteComment(comment)
    }

    return (
    <>
    <Card sx={{ width: '90%',
                margin: '10px auto',

        }}>

            <CardContent>
                {
                    user && (<Button sx={{ float: 'right' }}
                                     id={ comment._id }
                                     onClick={ handleRemoveComment }
                                     size='large'
                                     disabled={comment.userId !== user.id}>
                        <DeleteIcon/>
                    </Button>)
                }
                <Typography sx={{ float: 'right' }}
                            variant="body2"
                            color="text.secondary"
                            component="div"> { new Date (comment.date).toLocaleString() }
                </Typography>
                <Typography gutterBottom
                            variant="h5"
                            component="div"> { comment.author }
                </Typography>
                <Typography variant="body2"
                            color="text.secondary"
                            component="div"> { comment.body }
                </Typography>
            </CardContent>

    </Card>
    </>
    )
}





export default SingleComment