import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Create connection to specific Firebase instance
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw1YFjokBRoU_amWMJND4nCiwrHqstzNw",
    authDomain: "crwn-clothing-db-4a95c.firebaseapp.com",
    projectId: "crwn-clothing-db-4a95c",
    storageBucket: "crwn-clothing-db-4a95c.appspot.com",
    messagingSenderId: "1070562203792",
    appId: "1:1070562203792:web:49ee21899833c8059e2015"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Specific configuration for Google SSO service
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc (userDocRef,{
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

