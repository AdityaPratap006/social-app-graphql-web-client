import styled from 'styled-components';

export const ImageUploadArea = styled.div`
    &.center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

export const ImageUploadPreview = styled.div`
    width: 13rem;
    height: 13rem;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;