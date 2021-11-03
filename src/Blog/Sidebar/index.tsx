import React, {ReactElement} from 'react';
import {Button, Container} from "@mui/material";
import UserCard from "../UserBox";

function Sidebar(): ReactElement {

    return (
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
                backgroundColor: 'primary.dark',
                borderRight: '2px gray solid',
                borderTop: '2px gray solid'
            }}>
                <UserCard />
            </Container>
    );
}

export default Sidebar;