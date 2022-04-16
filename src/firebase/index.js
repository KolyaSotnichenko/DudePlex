import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB8J4EwGntAiu1ntW8cOqV_5MvSi1ylizo",
    authDomain: "dudeplex-d3943.firebaseapp.com",
    projectId: "dudeplex-d3943",
    storageBucket: "dudeplex-d3943.appspot.com",
    messagingSenderId: "14565264809",
    appId: "1:14565264809:web:57b224fa449bcdd848c8b8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider()

