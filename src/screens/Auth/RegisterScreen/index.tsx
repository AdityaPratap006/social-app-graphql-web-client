import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Screen, cardStyles, Layer } from './style';
import Card from '../../../components/shared/Card';
import Input from '../../../components/shared/FormElements/Input';
import { FormState, useForm } from '../../../hooks/form-hook';
import { InputElement } from '../../../models';
import { VALIDATOR_EMAIL } from '../../../utils/validators';
import Button from '../../../components/shared/FormElements/Button';
import { firebaseAuth } from '../../../utils/firebase';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

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
    const [formState, inputChangeHandler, setFormData] = useForm(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        try {
            const email = formState.inputs.email.value as string;
            await firebaseAuth.sendSignInLinkToEmail(email, {
                url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT_URL as string,
                handleCodeInApp: true,
            });

            // show toast notification
            toast.success(`Registration Link sent to ${email}!`);

            // save email in local storage
            window.localStorage.setItem('emailForRegistration', email);

            // clear form state
            setFormData({
                inputs: {
                    email: {
                        value: '',
                        isValid: false,
                    }
                },
                isValid: false,
            });

        } catch (err) {
            console.log(err.message, ": ", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Screen>
            <Layer />
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
                        value={formState.inputs.email.value as string}
                    />
                    {!loading && (
                        <Button type="submit" disabled={!formState.isValid}>
                            SUBMIT
                        </Button>
                    )}
                    {loading && (
                        <LoadingSpinner />
                    )}
                </form>
            </Card>
        </Screen>
    )
}

export default RegisterScreen;
