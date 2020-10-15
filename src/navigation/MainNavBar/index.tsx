import React, { useContext } from 'react';
import { FlattenSimpleInterpolation } from 'styled-components';
import { MdAccountCircle } from 'react-icons/md';
import { Header, MenuButton } from './style';
import { SideDrawerContext } from '../../context/sidedrawer.context';

interface MainNavBarProps {
    addCSS?: FlattenSimpleInterpolation;
}

const MainNavBar: React.FC<MainNavBarProps> = (props) => {
    const sideDrawerCTX = useContext(SideDrawerContext);

    return (
        <Header addCSS={props.addCSS}>
            <MenuButton onClick={sideDrawerCTX.open}>
                <MdAccountCircle className="icon" />
            </MenuButton>
            {props.children}
        </Header>
    );
};

export default MainNavBar;
