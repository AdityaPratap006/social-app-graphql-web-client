import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkList, NavLinkItem } from './style';

const MainNavLinks = () => {
    return (
        <NavLinkList>
            <NavLinkItem>
                <NavLink to={'/'} activeClassName={`active`} exact>
                    <p>HOME</p>
                </NavLink>
                <NavLink to={'/chats'} activeClassName={`active`} exact>
                    <p>CHATS</p>
                </NavLink>
            </NavLinkItem>
        </NavLinkList>
    );
};

export default MainNavLinks;
