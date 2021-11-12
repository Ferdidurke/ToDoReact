import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {useDispatch} from "react-redux";
import {IPostForm} from "./interfaces/interfaces";
import {Link} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Button, CardActionArea, CardActions} from "@mui/material";
import {blogApi} from "../../services/PostService";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import DeleteIcon from '@mui/icons-material/Delete';
import CommentsBlock from "./Comments/CommentsBlock";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout} from "../../store/redux-toolkit/reducers/authReducer";


function PostForm ({ item } : IPostForm) : ReactElement  {
    const [expandedAccordion, setExpandedAccordion] = React.useState(false)
    const [deletePost, { error }] = blogApi.useDeletePostMutation()
    const dispatch = useDispatch()

    if (error && (error as FetchBaseQueryError).status === 401) {
        dispatch(logout())
    }

    const handleRemovePost = (e: React.MouseEvent): void => {
        e.preventDefault()
        deletePost(item)
    }


    const openCommentsBlock = (): void => {
        setExpandedAccordion(true)
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
                <CardActionArea component={Link} to={ getId }>
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
                                                    { new Date(item.date).toLocaleString() }
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
                <Accordion id={item._id} expanded={expandedAccordion}>
                    <AccordionSummary
                        onClick={ openCommentsBlock }
                        expandIcon={ <ExpandMoreIcon /> }
                    >
                        <Typography
                            component="div">Comments
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div">
                            {
                                expandedAccordion ? ( <CommentsBlock _id={item._id}/> ) : null
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Card>
        </div>
    )
}

export default PostForm;