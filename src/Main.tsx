import React, {ReactElement} from "react";

export default function Main () : ReactElement {
    return (
        <div className='navbar'>
            <div className='navbar__link-container'>
                <a href='/'>MAIN</a>
            </div>
            <div className='navbar__link-container'>
                <a href='/todos'>TODOLIST</a>
            </div>
            <div className='navbar__link-container'>
                <a href='/blog'>BLOG</a>
            </div>
        </div>
    )
}