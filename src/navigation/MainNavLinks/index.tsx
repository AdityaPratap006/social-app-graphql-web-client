import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { RiHomeHeartFill, RiHomeHeartLine, RiChat1Fill, RiChat1Line } from 'react-icons/ri';
import { NavLinkList, NavLinkItem } from './style';
import { NavigationRoutes } from '../navRoutes';

interface NavLinkData {
    route: string;
    inactiveIcon: JSX.Element;
    activeIcon: JSX.Element;
    label: string;
    id: string | number;
}

const navlinksList: NavLinkData[] = [
    {
        id: 1,
        route: `${NavigationRoutes.HOME}`,
        label: `home`,
        inactiveIcon: <RiHomeHeartLine className='nav-icon' />,
        activeIcon: <RiHomeHeartFill className='nav-icon' />,
    },
    {
        id: 2,
        route: `${NavigationRoutes.CHATS}`,
        label: `chats`,
        inactiveIcon: <RiChat1Line className='nav-icon' />,
        activeIcon: <RiChat1Fill className='nav-icon' />,
    },
];

const MainNavLinks = () => {
    const history = useHistory();
    const [currentRoute, setCurrentRoute] = useState(`${NavigationRoutes.HOME}`);

    useEffect(() => {
        history.listen((location, action) => {
            setCurrentRoute(location.pathname);
        });
    }, [history]);

    const renderedLinks = navlinksList.map(navLink => {
        const { id, route, label, inactiveIcon, activeIcon } = navLink;
        return (
            <NavLinkItem key={id}>
                <NavLink to={route} activeClassName={`active`} exact>
                    <div className={`link-container`}>
                        {currentRoute === route ? activeIcon : inactiveIcon}
                        <p>{label}</p>
                    </div>
                </NavLink>
            </NavLinkItem>
        );
    });
    return (
        <NavLinkList>
            {renderedLinks}
        </NavLinkList>
    );
};

export default MainNavLinks;
