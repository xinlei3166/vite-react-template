import React from 'react';
import {NavLink} from "react-router-dom";
import './index.less'

function Link(props) {
    return (
        <div>
            <ul id={'nav'}>
                {props.routes.map((route) => (
                    <li key={route.title}>
                        <NavLink to={route.path} activeStyle={{color: '#61dafb'}}>{route.title}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Link
