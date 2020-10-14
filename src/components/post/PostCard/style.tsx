import styled, { css } from 'styled-components';

export const PostCardStyles = css`

`;

export const PostTitle = styled.h4`
    padding: 0;
    margin: 1rem 0;
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
`;

export const PostContent = styled.p`
    color: ${props => props.theme.text};
`;