import React, {ReactElement} from 'react';
import './styles.sass'

function Sidebar(): ReactElement {


    return (
            <div className='blog__sidebar'>
                <button className='blog__button sidebar-btn'>LOGIN</button>
                <button className='blog__button sidebar-btn'>NEW POST</button>
            </div>
    );
}

export default Sidebar;