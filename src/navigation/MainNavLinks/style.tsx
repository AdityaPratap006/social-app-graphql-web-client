import styled from 'styled-components';

export const NavLinkList = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const NavLinkItem = styled.li`
    margin: 0.5rem 0;
    padding: 0;
    width: 100%;
    height: 3rem;
    display: flex;

    a {
        color: black;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;

        .link-container {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 0 1rem;
            height: 100%;
            border-radius: 200px;
            transition: 0.2s ease;

            .nav-icon {
                width: 2rem;
                height: 2rem;
                /* transform: translateY(-2px); */
            }

            p {
                padding: 10px 0 0 0;
                margin: 0 1rem;
                font-size: 1.4rem;
                text-transform: capitalize;
                font-weight: bold;
            }

        }

        &.active {
            color: rebeccapurple;
        }

        &:hover {
            cursor: pointer;
            .link-container {
                color: rebeccapurple;
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }

    

    @media (max-width: 800px) {
        margin: 0 0.1rem;

        a {
            .link-container {
                p {
                    display: none;
                }
            }
        }

        a.active {
            .link-container {
        
            }
        }
    }
`;