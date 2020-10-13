import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Screen, cardStyles, Layer } from './style';
import Card from '../../../components/shared/Card';
import Input from '../../../components/shared/FormElements/Input';
import { FormState, useForm } from '../../../hooks/form.hook';
import { InputElement } from '../../../models';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../utils/validators';
import Button from '../../../components/shared/FormElements/Button';
import { firebaseAuth, googleAuthProvider } from '../../../utils/firebase';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { AuthContext, AuthActionType } from '../../../context/auth.context';

const INITIAL_STATE: FormState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    },
    isValid: false,
}

const LoginScreen = () => {
    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const loginWithGoogleHandler = async () => {
        setLoading(true);
        try {
            const result = await firebaseAuth.signInWithPopup(googleAuthProvider);
            const { user } = result;

            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                auth.dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: {
                        token: idTokenResult.token,
                        name: user.displayName as string,
                        email: user.email as string,
                    }
                });

            }

            // show toast notification
            toast.success(`Logged in successfully!`);
        } catch (err) {
            setLoading(false);
            console.log(err.message, ": ", err);
            toast.error(err.message);
        }
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        try {
            const email = formState.inputs.email.value as string;
            const password = formState.inputs.password.value as string;
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            const { user } = result;

            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                auth.dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: {
                        token: idTokenResult.token,
                        name: user.displayName as string,
                        email: user.email as string,
                    }
                });

            }

            // show toast notification
            toast.success(`Logged in successfully!`);

        } catch (err) {
            setLoading(false);
            console.log(err.message, ": ", err);
            toast.error(err.message);
        }
    }

    return (
        <Screen>
            <Layer />
            <Card addCSS={cardStyles}>
                <h3>LOGIN</h3>
                {!loading && (
                    <Button onClick={loginWithGoogleHandler}>
                        LOGIN WITH GOOGLE
                    </Button>
                )}
                <h4>OR</h4>
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
                    <Input
                        element={InputElement.INPUT}
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Password should have atleast 6 characters."
                        getInput={inputChangeHandler}
                    />
                    {!loading && (
                        <Button type="submit" disabled={!formState.isValid}>
                            LOGIN
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

export default LoginScreen;
