import  { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import 'firebase/compat/auth';
const app = initializeApp({
    apiKey: 'AIzaSyDGbai6URW-9-kXiQznX8AR1tVPiMjTwRo',
    authDomain: 'parking-app-338514.firebaseapp.com',
    projectId: '338514',
    storageBucket:'parking-app-338514.appspot.com',
    messagingSenderId: '1016015966144',
    appId: '1:1016015966144:web:920a5ac7af756d26f90225',
    measurementId: 'G-4XPBWXCENB'
});

export const auth = getAuth();
export default app;