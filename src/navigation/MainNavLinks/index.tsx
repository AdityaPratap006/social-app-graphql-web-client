import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
    RiHomeHeartFill,
    RiHomeHeartLine,
    RiChat1Fill,
    RiChat1Line,
    RiSettings2Fill,
    RiSettings2Line,
    RiUserLine,
    RiUserFill,
    RiMapPinLine,
    RiMapPinFill,
    RiTeamFill,
    RiTeamLine,
    RiNotification2Line,
    RiNotification2Fill,
} from 'react-icons/ri';
import { NavLinkList, NavLinkItem } from './style';
import { NavigationRoutes } from '../navRoutes';

interface NavLinkData {
    route: string;
    inactiveIcon: JSX.Element;
    activeIcon: JSX.Element;
    label: string;
    id: number;
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
    {
        id: 5,
        route: `${NavigationRoutes.NOTIFICATIONS}`,
        label: `notifications`,
        inactiveIcon: <RiNotification2Line className='nav-icon' />,
        activeIcon: <RiNotification2Fill className='nav-icon' />,
    },
    {
        id: 6,
        route: `${NavigationRoutes.PROFILE}`,
        label: `profile`,
        inactiveIcon: <RiUserLine className='nav-icon' />,
        activeIcon: <RiUserFill className='nav-icon' />,
    },
    {
        id: 7,
        route: `${NavigationRoutes.SETTINGS}`,
        label: `settings`,
        inactiveIcon: <RiSettings2Line className='nav-icon' />,
        activeIcon: <RiSettings2Fill className='nav-icon' />,
    },
];

const linksToBeHiddenInSmallDevices = [6, 7];

const MainNavLinks = () => {
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
        const { id, route, label, inactiveIcon, activeIcon } = navLink;
        const toBeHidden = linksToBeHiddenInSmallDevices.includes(id);
        return (
            <NavLinkItem key={id} className={`${toBeHidden && 'hide'}`}>
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
