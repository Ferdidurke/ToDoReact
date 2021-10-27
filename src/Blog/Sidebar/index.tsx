import React, {ReactElement} from 'react';
import './styles.sass'

function Sidebar(): ReactElement {


    return (
            <div className='blog__sidebar'>
                <button className='blog__sidebar__navlink'>LOGIN</button>
                <button className='blog__sidebar__navlink'>NEW POST</button>
            </div>
    );
}

export default Sidebar;