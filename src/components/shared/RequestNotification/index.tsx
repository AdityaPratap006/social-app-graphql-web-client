import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { cloudMessaging } from '../../../utils/firebase';
import { SAVE_FCM_TOKEN } from "../../../graphql/mutations";

interface SaveFcmTokenResult {
    saveFcmToken: {
        message: string;
    };
}

const RequestNotification = () => {
    const [saveFcmTokenMutate] = useMutation<SaveFcmTokenResult>(SAVE_FCM_TOKEN);

    useEffect(() => {
        cloudMessaging
            .getToken({
                vapidKey: 'BC8TOrHSuBsDUij-uiQn1o4ULzgHRVMAhML7GcL8jFUK75FonutyRYiDPIemfqEGFd8gLCHh8wPtgGW_leM4eck',
            })
            .then((token) => {
                console.log(`[firabse messaging token]: ${token}`);
                saveFcmTokenMutate({
                    variables: {
                        input: {
                            fcmToken: token,
                        }
                    }
                }).then(({ data, errors }) => {
                    if (data) {
                        console.log(`[FCM TOKEN SAVED]: `, data);
                        toast.success(`${data.saveFcmToken.message}`);
                    } else if (errors) {
                        console.log(`[FCM TOKEN NOT SAVED]: `, errors);
                    }
                }).catch(err => {
                    console.log(`[FCM TOKEN NOT SAVED]: `, err);
                });
            })
            .catch(err => {
                console.log(`[firabse messaging error]: ${err}`);
                toast.warning(`Please enable notifications for a more engaging experience`);
            });
    }, [saveFcmTokenMutate]);

    return (
        <div style={{ display: 'none' }}>

        </div>
    )
}

export default RequestNotification;
