import React from 'react';
import { Screen, cardStyles } from './style';
import Card from '../../../components/shared/Card';
import Input from '../../../components/shared/FormElements/Input';
import { FormState, useForm } from '../../../hooks/form-hook';
import { InputElement } from '../../../models';
import { VALIDATOR_EMAIL } from '../../../utils/validators';
import Button from '../../../components/shared/FormElements/Button';

const INITIAL_STATE: FormState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
}

const RegisterScreen = () => {
    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <Screen>
            <Card addCSS={cardStyles}>
                <h3>REGISTER</h3>
                <form onSubmit={formSubmitHandler}>
                    <Input
                        element={InputElement.INPUT}
                        id="email"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        getInput={inputChangeHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        SUBMIT
                    </Button>
                </form>
            </Card>
        </Screen>
    )
}

export default RegisterScreen;
