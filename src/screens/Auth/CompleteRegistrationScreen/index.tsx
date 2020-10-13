import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Screen, Layer, cardStyles } from './style';
import Card from '../../../components/shared/Card';
import Input from '../../../components/shared/FormElements/Input';
import { FormState, useForm } from '../../../hooks/form.hook';
import { InputElement } from '../../../models';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_VALUE } from '../../../utils/validators';
import Button from '../../../components/shared/FormElements/Button';
import { firebaseAuth } from '../../../utils/firebase';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { NavigationRoutes } from '../../../navigation/navRoutes';
import { AuthActionType, AuthContext } from '../../../context/auth.context';

const INITIAL_STATE: FormState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
        name: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
        confirmPassword: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
}

const CompleteRegistrationScreen = () => {
    const [formState, inputChangeHandler, setFormData] = useForm(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const storedEmail = window.localStorage.getItem('emailForRegistration');
        if (!storedEmail) {
            history.push(NavigationRoutes.LOGIN);
            return;
        }

        const newFormData: FormState = { ...INITIAL_STATE };
        newFormData.inputs.email = { value: storedEmail, isValid: true };

        setFormData(newFormData);

    }, [history, setFormData]);

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { email, password, name } = formState.inputs;

        setLoading(true);
        try {
            const result = await firebaseAuth.signInWithEmailLink(email.value as string, window.location.href);
            // console.log(result);

            if (result.user?.emailVerified) {
                window.localStorage.removeItem('emailForRegistration');
                const user = firebaseAuth.currentUser;
                if (user) {
                    await user.updatePassword(password.value as string);
                    await user.updateProfile({ displayName: name.value as string });

                    const idTokenResult = await user.getIdTokenResult();

                    auth.dispatch({
                        type: AuthActionType.LOGGED_IN_USER,
                        payload: {
                            name: user.displayName || '',
                            email: user.email || '',
                            token: idTokenResult.token,
                        },
                    });

                }
            }

            setLoading(false);
        } catch (err) {
            console.log("Registration Incomplete! ", err.message, ": ", err);
            setLoading(false);
            toast.error(err.message);
        }
    }

    return (
        <Screen>
            <Layer />
            <Card addCSS={cardStyles}>
                <h4>COMPLETE REGISTRATION</h4>
                <form onSubmit={formSubmitHandler}>
                    <input
                        style={{
                            position: 'fixed',
                            top: '-200px',
                            left: '-100px',
                            width: '5px',
                        }}
                        type={"text"}
                        name={"fakeUsernameAutoFill"}
                    />
                    <input
                        style={{
                            position: 'fixed',
                            top: '-100px',
                            left: '-100px',
                            width: '5px',
                        }}
                        type={"password"}
                        name={"fakePasswordAutoFill"}
                    />
                    <Input
                        element={InputElement.INPUT}
                        id="email"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        getInput={inputChangeHandler}
                        value={formState.inputs.email.value as string}
                        disabled
                    />
                    <Input
                        element={InputElement.INPUT}
                        id="name"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Name is required."
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
                    <Input
                        element={InputElement.INPUT}
                        id="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        validators={[VALIDATOR_VALUE(formState.inputs.password.value as string)]}
                        errorText="Passwords don't match."
                        getInput={inputChangeHandler}
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
    );
};

export default CompleteRegistrationScreen;
