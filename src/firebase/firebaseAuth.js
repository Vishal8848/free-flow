import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'
import firebase from './firebase'

const auth = getAuth(firebase);
const store = getFirestore(firebase);

export const firebaseLogin = async (cred) => {
    
    try {
        let response = await signInWithEmailAndPassword(auth, cred.email, cred.passwd);
        
        // Verify Email
        response.user.emailVerified = true;

        // Cookie Access
        if(cred.save)   {
            let access = { uid: response.user.uid, verified: true, on: Date.now() };
            window.localStorage.setItem('access', JSON.stringify(access));

        }   else window.localStorage.removeItem('access')

        return response.user;

    }   catch(err)  { return err.message }

}

export const firebaseGoogleLogin = async () => {

    try {
        const Google = new GoogleAuthProvider();

        const response = await signInWithPopup(auth, Google);

        return response.user;

    }   catch(err) { return err.message }
}

export const firebaseRegister = async (cred, user) => {
 
    try {
        let response = await createUserWithEmailAndPassword(auth, cred.email, cred.passwd);

        // User Display Name
        response.user.displayName = cred.fname + ' ' + cred.lname;

        // Write User Document
        setDoc(doc(store, 'users', response.user.uid), user);

        await sendEmailVerification(response.user);

        return response.user;

    }   catch(err)  { return err.message }

}

export const firebaseResetRequest = async (cred) => {

    try {
        await sendPasswordResetEmail(auth, cred.email);
        
    }   catch(err)   { return err.message }

}

export const firebaseResetPasswd = async (cred) => {

    try {
        await verifyPasswordResetCode(auth.cred.code);

        await confirmPasswordReset(auth, cred.code, cred.passwd);

    }   catch(err)  { return err.message }

}