import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import Card from '../../../components/shared/Card';
import Screen from '../../../components/shared/Screen';
import { CreatePostScreenContent, cardStyles } from './style';
import { FormState, useForm } from '../../../hooks/form.hook';
import { InputElement, IPost } from '../../../models';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import Input from '../../../components/shared/FormElements/Input';
import Button from '../../../components/shared/FormElements/Button';
import { POST_CREATE } from '../../../graphql/mutations';
// import updateFunctions from '../../../graphql/updateFunctions';
import { useNetworkStatus } from '../../../hooks/networkStatus.hook';

interface PostCreateAttributes {
    title: string;
    description: string;
}

const INITIAL_STATE: FormState = {
    inputs: {
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        }
    },
    isValid: false,
};

const CreatePostScreen = () => {
    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);
    const [creating, setCreating] = useState(false);
    const isOnline = useNetworkStatus();
    const [mutate] = useMutation<{ postCreate: IPost }>(POST_CREATE, {
        // update: updateFunctions.postCreate,
        // onError: (err) => {
        //     console.log({ err });

        //     toast.error(`Couldn't write to cache: ${err.message}`);
        // },
        // context: {
        //     serializationKey: 'CREATE_POST',
        //     tracked: !navigator.onLine,
        // },
    });

    const sendPostCreateRequest = async (attrs: PostCreateAttributes) => {
        try {
            const result = await mutate({
                variables: {
                    input: {
                        ...attrs,
                    }
                },
                // optimisticResponse: {
                //     postCreate: {
                //         _id: Date.now().toString(),
                //         title: attrs.title,
                //         description: attrs.description,
                //         createdAt: Date.now().toLocaleString(),
                //         updatedAt: Date.now().toLocaleString(),
                //         createdBy: {
                //             _id: '-1',
                //             email: '',
                //             name: '',
                //             images: [],
                //         },
                //     }
                // }
            });
            console.log(result);
            toast.success(`Post shared!`);
        } catch (error) {
            if (!isOnline) {
                toast.error('Network Error: You are offline!');
            } else {
                toast.error(`Something went wrong: ${error.message}`, { autoClose: false });
            }
        }
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setCreating(true);

        const { title, description } = formState.inputs;


        await sendPostCreateRequest({
            title: title.value as string,
            description: description.value as string,
        });

        setCreating(false);
    }

    return (
        <Screen
            title="Share something"
            stackedUpScreen
            withGoBackButton
        >
            <CreatePostScreenContent>
                <Card addCSS={cardStyles}>
                    <form onSubmit={formSubmitHandler}>
                        <Input
                            id="title"
                            element={InputElement.INPUT}
                            type="text"
                            label="Title"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Title is required."
                            getInput={inputChangeHandler}
                        />
                        <Input
                            id="description"
                            element={InputElement.TEXT_AREA}
                            type="text"
                            label="Description"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Description is required."
                            getInput={inputChangeHandler}
                        />
                        {!creating && (
                            <Button type="submit" disabled={!formState.isValid}>
                                SUBMIT
                            </Button>
                        )}
                        {creating && (
                            <LoadingSpinner />
                        )}
                    </form>
                </Card>
            </CreatePostScreenContent>
        </Screen>
    );
};

export default CreatePostScreen;
