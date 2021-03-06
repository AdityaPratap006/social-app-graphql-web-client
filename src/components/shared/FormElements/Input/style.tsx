import styled from 'styled-components';

export const FormControl = styled.div`
    margin: 1rem 0;
    width: 100%;

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.primary};
    }

    input {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        background: #f8f8f8;
        padding: 0.25rem;
        border-radius: 6px;

        &:focus {
            outline: none;
            background: #ebebeb;
            border-color: ${props => props.theme.primary};
        }

        &:disabled {
            background: lightgray;
        }
    }

    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: #f8f8f8;
        padding: 0.15rem 0.25rem;

        &:focus {
            outline: none;
            background: #ebebeb;
            border-color: #510077;
        }
    }

    &.form-control--invalid {
        label {
            color: red;
        }

        p {
            color: red;
            margin-top: 0.2rem;
        }

        input {
            border-color: red;
            background: #ffd1d1;
        }

        textarea {
            border-color: red;
            background: #ffd1d1;
        }
    }
`;