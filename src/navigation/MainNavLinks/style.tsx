import styled from 'styled-components';

export const NavLinkList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 1rem;
    width: 100%;
    height: 3.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const NavLinkItem = styled.li`
    margin: 0 1.5rem;
    padding: 0;
    min-width: 5.5rem;
    height: 100%;
    display: flex;

    a {
        color: black;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        width: 100%;

        p {
            padding: 0px;
            margin: 2px 1rem;
            font-size: 1rem;
        }

        &.active {
            color: rebeccapurple;
        }

        &:hover {
            cursor: pointer;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.1);
        }
    }

    

    @media (max-width: 800px) {
        margin: 0 0.1rem;

        a {
            p {
                display: none;
            }
        }

        a.active {
            p {
                display: block;
            }
        }
    }
`;