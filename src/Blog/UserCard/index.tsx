import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {Avatar, Box, Card, CardHeader, Icon, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../store/redux-toolkit/reducers/authReducer";

function UserCard(props: any) {
    const { user } = useSelector((state: RootState)=> state.auth)
    const dispatch = useDispatch()

    const userLetter = user.firstName.slice(0,1)
    const userFullName = `${user.firstName} ${user.lastName}`
    return (
        <Card sx={{ maxWidth: 250,
                    borderRadius: '10px',
                    margin: '10px',
                    bgcolor: '#e1eff7'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: '#1565c0' }}>
                        { userLetter }
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => dispatch(logout())}>
                        <LogoutIcon/>
                    </IconButton>
                }
                title={ userFullName }
                subheader='Online'
            />
        </Card>
    );
}





export default UserCard;