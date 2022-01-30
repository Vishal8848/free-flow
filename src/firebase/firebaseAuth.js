import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import firebase from './firebase'

const auth = getAuth(firebase);
const store = getFirestore(firebase);

export const firebaseLogin = async (cred) => {
    
    let error = true, data = null;
    
    signInWithEmailAndPassword(auth, cred.email, cred.passwd)
    .then(response => {

        error = false;
        data = response.user;

        // Verify Email
        response.user.emailVerified = true;

        let access = { uid: response.user.uid, verified: true, on: Date.now() };

        // Cookies Access
        window.localStorage.setItem('access', JSON.stringify(access));

    }).catch(err => error = err.message);

    return { data, error };
}

export const firebaseRegister = async (cred, user) => {
 
    // Response Data
    let error = true, data = null;
    
    // Create New User
    createUserWithEmailAndPassword(auth, cred.email, cred.passwd)
    .then(response => {

        // User Display Name
        response.user.displayName = cred.fname + ' ' + cred.lname;

        // Write User Document
        setDoc(doc(store, 'users', response.user.uid), user);

        let access = { uid: response.user.uid, verified: false, on: Date.now()  }

        // Cookie access
        window.localStorage.setItem('access', JSON.stringify(access));

        // Send Email Link
        sendEmailVerification(response.user)
        .then(() => {
            error = false;
            data = response.user;
        }).catch(err => data = err.message)

    }).catch(err => data = err.message)

    return { data, error };
}

export const firebaseResetRequest = (cred) => {
    
    let error = true, data = null;

    sendPasswordResetEmail(auth, cred.email)
    .then(() => error = false)
    .catch(err => data = err.message);

    return { data, error };
}

export const firebaseResetPasswd = (cred) => {

    let error = true, data = null;

    verifyPasswordResetCode(auth, cred.code)
    .then(response => {

        confirmPasswordReset(auth, cred.code, cred.passwd)
        .then(() => error = false)
        .catch(err => data = err.message)

    }).catch(err => data = err.message);

    return { data, error };
}