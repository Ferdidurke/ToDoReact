import React from "react";
import {ICommentForm} from "./interfaces/interfaces";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Comment = ({comment}: ICommentForm)  => {
    return (
    <>
    <Card sx={{ width: '90%',
                margin: '10px auto',

        }}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{
                    float: 'right'
                                }}
                variant="body2" color="text.secondary">
                    {new Date (comment.date).toLocaleString()}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {comment.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {comment.body}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    </>
    )
}





export default Comment