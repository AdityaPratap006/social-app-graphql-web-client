import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';
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

const USER_CREATE = gql`
    mutation userCreate($input: AuthTokenInput!) {
        userCreate(input: $input) {
            username,
            email
        }
    }
`;

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
    const [userCreate] = useMutation(USER_CREATE);

    const { dispatch } = auth;
    useEffect(() => {
        dispatch({
            type: AuthActionType.AUTO_LOGIN_DEACTIVATE,
        });

        return () => {
            dispatch({
                type: AuthActionType.AUTO_LOGIN_ACTIVATE,
            });
        };
    }, [dispatch]);

    const sendCreateUserRequest = async (token: string) => {
        try {
            const result = await userCreate({
                variables: {
                    input: {
                        authToken: token,
                    },
                }
            });
            console.log(result);
        } catch (error) {
            toast.error(error.message, { autoClose: false });
        }
    }

    const loginWithGoogleHandler = async () => {

        setLoading(true);

        try {

            const result = await firebaseAuth.signInWithPopup(googleAuthProvider);
            const { user } = result;

            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                await sendCreateUserRequest(idTokenResult.token);

                auth.dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: {
                        token: idTokenResult.token,
                        name: user.displayName as string,
                        email: user.email as string,
                    }
                });

                auth.setLoading(false);

                // show toast notification
                toast.success(`Logged in successfully!`);
            }


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

                console.log('sending userCreate request after logging in via email and password');

                await sendCreateUserRequest(idTokenResult.token);

                console.log('user created (in case it did not exist earlier)');

                auth.dispatch({
                    type: AuthActionType.LOGGED_IN_USER,
                    payload: {
                        token: idTokenResult.token,
                        name: user.displayName as string,
                        email: user.email as string,
                    }
                });
                auth.setLoading(false);
                console.log(`[LOGGED_IN_USER] action dispatched from login screen.`);

                // show toast notification
                toast.success(`Logged in successfully!`);
            }

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
