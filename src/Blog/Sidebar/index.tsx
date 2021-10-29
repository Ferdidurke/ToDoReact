import React, {ReactElement} from 'react';
import {Button, Container} from "@mui/material";

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
                <Button variant='contained' sx={{marginTop: '10px'}}>LOGIN</Button>
                <Button variant='contained' sx={{marginTop: '10px'}}>NEW POST</Button>
            </Container>
    );
}

export default Sidebar;