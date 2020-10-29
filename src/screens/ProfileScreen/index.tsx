import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import ImageResizer from 'react-image-file-resizer';
import { ProfileScreenContent, cardStyles } from './style';
import Screen from '../../components/shared/Screen';
import { useForm, FormState } from '../../hooks/form.hook';
import Card from '../../components/shared/Card';
import Input from '../../components/shared/FormElements/Input';
import Button from '../../components/shared/FormElements/Button';
import { InputElement } from '../../models';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../utils/validators';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { IUserProfile } from '../../models/user';
import { PROFILE } from '../../graphql/queries';
import { USER_UPDATE } from '../../graphql/mutations';
import ImageUpload from '../../components/shared/FormElements/ImageUpload';

interface UserUpdateAttributes {
    name: string;
    username: string;
    about: string;
    imageBase64String?: string;
}

const INITIAL_STATE: FormState = {
    inputs: {
        image: {
            value: '',
            isValid: false,
        },
        username: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
        name: {
            value: '',
            isValid: false,
        },
        about: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
};

const ProfileScreen: React.FC = () => {
    const [formState, inputChangeHandler, setFormData] = useForm(INITIAL_STATE);
    const [updating, setUpdating] = useState(false);
    const { data, loading, error } = useQuery<{ profile: IUserProfile }>(PROFILE);
    const [userUpdate] = useMutation<{ userUpdate: IUserProfile }>(USER_UPDATE);

    useEffect(() => {
        if (data) {
            setFormData({
                inputs: {
                    username: {
                        value: data.profile.username,
                        isValid: true,
                    },
                    email: {
                        value: data.profile.email,
                        isValid: true,
                    },
                    name: {
                        value: data.profile.name,
                        isValid: true,
                    },
                    about: {
                        value: data.profile.about,
                        isValid: true,
                    },
                },
                isValid: true,
            });
        }
    }, [data, setFormData]);

    if (error) {
        toast.error(error.message);
        return <h4>Error Fetching Profile</h4>;
    }

    const sendUserUpdateRequest = async (attrs: UserUpdateAttributes) => {
        try {
            const result = await userUpdate({
                variables: {
                    input: {
                        ...attrs,
                    }
                }
            });
            console.log(result);
            toast.success(`Your profile has been updated!`);
        } catch (error) {
            toast.error(error.message, { autoClose: false });
        }
    }

    const resizeImageFile = (file: File): Promise<string> => new Promise(resolve => {
        ImageResizer.imageFileResizer(
            file, 300, 300, 'JPEG', 100, 0,
            uri => {
                resolve(uri as string);
            },
            'base64', 200, 200
        );
    });

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUpdating(true);

        const { name, username, about, image } = formState.inputs;

        let resizedImageBase64String = await resizeImageFile(image?.value as File);

        if (resizedImageBase64String === 'File Not Found') {
            resizedImageBase64String = '';
        }

        await sendUserUpdateRequest({
            name: name.value as string,
            username: username.value as string,
            about: about.value as string,
            imageBase64String: resizedImageBase64String,
        });

        setUpdating(false);
    }

    return (
        <Screen
            title="profile"
            stackedUpScreen
            withGoBackButton
        >
            <ProfileScreenContent>
                {loading && <LoadingSpinner asOverlay />}
                {!loading && data && (
                    <Card addCSS={cardStyles}>
                        <form onSubmit={formSubmitHandler}>
                            <ImageUpload
                                id="image"
                                onInput={inputChangeHandler}
                                errorText={`Please provide an image!`}
                                center
                                initialImageURL={data.profile.images[0].url}
                            />
                            <Input
                                id="username"
                                element={InputElement.INPUT}
                                type="text"
                                label="Username"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Username is required."
                                getInput={inputChangeHandler}
                                initialValue={data.profile.username}
                                initialValidity={true}
                            />
                            <Input
                                id="email"
                                element={InputElement.INPUT}
                                type="email"
                                label="E-mail"
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Please enter a valid email address."
                                getInput={inputChangeHandler}
                                initialValue={data.profile.email}
                                initialValidity={true}
                                disabled
                            />
                            <Input
                                id="name"
                                element={InputElement.INPUT}
                                type="text"
                                label="Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Name is required."
                                getInput={inputChangeHandler}
                                initialValue={data.profile.name}
                                initialValidity={true}
                            />
                            <Input
                                id="about"
                                element={InputElement.TEXT_AREA}
                                label="About"
                                validators={[]}
                                getInput={inputChangeHandler}
                                initialValue={data.profile.about}
                                initialValidity={true}
                            />
                            {!updating && (
                                <Button type="submit" disabled={!formState.isValid}>
                                    SUBMIT
                                </Button>
                            )}
                            {updating && (
                                <LoadingSpinner />
                            )}
                        </form>
                    </Card>
                )}
            </ProfileScreenContent>
        </Screen>
    );
};

export default ProfileScreen;
