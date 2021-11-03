import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {Avatar, Box, Card, CardHeader, Icon, IconButton} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserCard(props: any) {
    const { user } = useSelector((state: RootState)=> state.auth)
    return (
        <Box sx={{width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(#2c557e, #1565c0)',
            border: '2px solid',
            borderRadius: '15px',
            color: 'white',
            font: '12px Roboto',
            '& > p': {
                lineHeight: '2px'
            }
                }}>
            <div>
                <AccountCircleIcon/>
            </div>
            <div>
                <p>You logged as:</p>
                <p>{user.firstName}  {user.lastName}</p>
            </div>
        </Box>
    );
}

export default UserCard;