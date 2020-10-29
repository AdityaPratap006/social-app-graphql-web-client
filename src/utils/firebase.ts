import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBjeA4yA_jGaWqlCMmSVTSRFREYhK-dl9A",
    authDomain: "social-media-app-graphql.firebaseapp.com",
    // databaseURL: "https://social-media-app-graphql.firebaseio.com",
    projectId: "social-media-app-graphql",
    storageBucket: "social-media-app-graphql.appspot.com",
    // messagingSenderId: "51154739422",
    appId: "1:51154739422:web:80513a44db999a2e3b624f",
    measurementId: "G-ZCNS2GGNE0"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
