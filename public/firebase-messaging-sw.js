/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBjeA4yA_jGaWqlCMmSVTSRFREYhK-dl9A",
    authDomain: "social-media-app-graphql.firebaseapp.com",
    // databaseURL: "https://social-media-app-graphql.firebaseio.com",
    projectId: "social-media-app-graphql",
    storageBucket: "social-media-app-graphql.appspot.com",
    messagingSenderId: "51154739422",
    appId: "1:51154739422:web:80513a44db999a2e3b624f",
    measurementId: "G-ZCNS2GGNE0"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/favicon.ico',
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', event => {
    console.log(event)
    return event;
});