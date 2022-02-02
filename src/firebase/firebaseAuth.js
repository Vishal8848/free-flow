import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset, GoogleAuthProvider, signInWithPopup, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite'
import firebase from './firebase'

const auth = getAuth(firebase);
const store = getFirestore(firebase);
const themes = [ 'danger', 'success', 'primary', 'warning' ];
const cast = (data) => { return data.split('(')[1].slice(0, -2) }

export const firebaseLogin = async (cred) => {
    
    try {
        let response = await signInWithEmailAndPassword(auth, cred.email, cred.passwd);

        // Verify Email
        response.user.emailVerified = true;

        let access = { uid: response.user.uid, verified: true, on: Date.now() };

        // Cookie Access
        if(cred.save)   window.localStorage.setItem('access', JSON.stringify(access))

        else window.localStorage.removeItem('access')

        return { error: false, data: access };

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseGoogleLogin = async () => {

    try {
        const Google = new GoogleAuthProvider();

        const response = await signInWithPopup(auth, Google);

        return { error: false, data: response.user };

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseRegister = async (cred) => {
 
    try {
        let response = await createUserWithEmailAndPassword(auth, cred.email, cred.passwd);

        // User Display Name
        response.user.displayName = cred.fname + ' ' + cred.lname;

        // Write User Document
        await setDoc(doc(store, 'users', response.user.uid), {
            fname: cred.fname,
            lname: cred.lname,
            dob: cred.dob,
            gender: cred.gender,
            theme: themes[Math.floor(Math.random() * themes.length)],
            cred: {
                email: cred.email,
                type: 'auth/email-and-password'
            },
            photoURL: false,
            bgURL: false,
            occupation: "",
            description: "",
            location: {
                country: "",
                state: "",
                city: ""
            },
            education: "",
            hobbies:  "",
            friends: [],
            posts: [],
            saved: [],
            likes: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        window.localStorage.setItem('ffreg', JSON.stringify({ email: cred.email, at: Date.now() }))

        await sendSignInLinkToEmail(auth, cred.email);

        return { error: false, data: response.user };

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseResetRequest = async (cred) => {

    try {
        await sendPasswordResetEmail(auth, cred.email);
        
    }   catch(err)   { return { error: true, data: cast(err.message) } }

}

export const firebaseResetPasswd = async (cred) => {

    try {
        await verifyPasswordResetCode(auth.cred.code);

        await confirmPasswordReset(auth, cred.code, cred.passwd);

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseLinkLogin = async (email) => {

    try {
        const status = isSignInWithEmailLink(auth, window.location.href)

        if(status) {
            const response = await signInWithEmailLink(auth, email, window.location.href)
            return { error: false, data: response.user }
        }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}