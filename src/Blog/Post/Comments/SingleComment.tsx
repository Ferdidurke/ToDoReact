import React, {ReactElement} from "react";
import {ICommentForm} from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const SingleComment = ({ comment }: ICommentForm) : ReactElement  => {
    return (
    <>
    <Card sx={{ width: '90%',
                margin: '10px auto',

        }}>
        <CardActionArea>
            <CardContent>
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
        </CardActionArea>
    </Card>
    </>
    )
}





export default SingleComment