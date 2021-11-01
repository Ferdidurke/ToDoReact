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

            </Container>
    );
}

export default Sidebar;