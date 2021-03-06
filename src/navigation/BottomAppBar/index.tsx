import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {
    RiHomeHeartFill,
    RiHomeHeartLine,
    RiChat1Fill,
    RiChat1Line,
    RiMapPinLine,
    RiMapPinFill,
    RiTeamFill,
    RiTeamLine,
} from 'react-icons/ri';
import { AppBar, NavLinkList, NavLinkItem } from './style';
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
    {
        id: 3,
        route: `${NavigationRoutes.LOCATE}`,
        label: `locate`,
        inactiveIcon: <RiMapPinLine className='nav-icon' />,
        activeIcon: <RiMapPinFill className='nav-icon' />,
    },
    {
        id: 4,
        route: `${NavigationRoutes.FAMILIES}`,
        label: `families`,
        inactiveIcon: <RiTeamLine className='nav-icon' />,
        activeIcon: <RiTeamFill className='nav-icon' />,
    },
];

const BottomAppBar = () => {
    const history = useHistory();
    const [currentRoute, setCurrentRoute] = useState(`${history.location.pathname}`);

    useEffect(() => {
        const unregister = history.listen((location, action) => {
            setCurrentRoute(location.pathname);
        });
        return () => {
            unregister();
        }
    }, [history]);

    const renderedLinks = navlinksList.map(navLink => {
        const { id, route, inactiveIcon, activeIcon } = navLink;

        return (
            <NavLinkItem key={id}>
                <NavLink to={route} activeClassName={`active`} exact>
                    {currentRoute === route ? activeIcon : inactiveIcon}
                </NavLink>
            </NavLinkItem>
        );
    });

    return (
        <AppBar>
            <NavLinkList>
                {renderedLinks}
            </NavLinkList>
        </AppBar>
    );
};

export default BottomAppBar;
