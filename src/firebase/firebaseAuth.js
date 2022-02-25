import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import firebase from './firebase'

import Cookies from 'universal-cookie'
import Hash from 'object-hash'

const cookies = new Cookies()

const auth = getAuth(firebase);
const store = getFirestore(firebase);
const themes = [ 'danger', 'success', 'primary', 'dark' ];
const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

const firebaseUserDocExists = async (uid) => {

    try {
        const user = await getDoc(doc(store, 'users', uid))

        return { error: false, data: user.exists() }

    }   catch(err)  { return { error: true, data: cast(err.message) } }
}

const firebaseCreateUserDoc = async (uid, cred, type) => {

    const providers = [ 'auth/email-and-password', 'auth/google-provider', 'auth/facebook-provider', 'auth/twitter-provider', 'auth/github-provider' ];

    try {
        await setDoc(doc(store, 'users', uid), {
            fname: cred.fname,
            lname: cred.lname,
            dob: cred.dob,
            gender: cred.gender,
            theme: themes[Math.floor(Math.random() * themes.length)],
            cred: {
                email: cred.email,
                type: providers[type]
            },
            hasDP: false,
            hasBG: false,
            occupation: "",
            description: "",
            location: {
                country: "",
                state: "",
                city: ""
            },
            education: "",
            hobbies:  "",
            friends: [ uid ],
            posts: [],
            saved: [],
            likes: [],
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString()
        });

        return { error: false, data: true }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseLogout = async () => {

    try {
        await signOut(auth)

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseLogin = async (cred) => {
    
    try {
        let response = await signInWithEmailAndPassword(auth, cred.email, cred.passwd)

        if(!response.user.emailVerified)  return { error: true, data: "auth/user-not-verified" }
        
        const flipped = response.user.uid.split("").reverse().join(""), maxAge = 2 * 24 * 60 * 60
        
        cookies.set('commit', flipped, { path: '/', maxAge: maxAge })

        cred.save ?
            cookies.set('access', Hash(response.user.uid + process.env.REACT_APP_HASH_KEY), { path: '/', maxAge: maxAge }) :
            cookies.set('access', Hash(response.user.uid + process.env.REACT_APP_HASH_KEY), { path: '/'})

        return { error: false, data: { uid: response.user.uid, last: cookies.get('last') ?? null } };

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseGoogleLogin = async () => {

    try {
        const Google = new GoogleAuthProvider();

        const response = await signInWithPopup(auth, Google);

        const userExists = await firebaseUserDocExists(response.user.uid)

        if(!userExists.data)  {

            const cred = {
                fname: response.user.displayName.split(' ')[0],
                lname: response.user.displayName.split(' ')[1] != null ? response.user.displayName.split(' ')[1] : '',
                dob: '',
                gender: '',
                email: response.user.email
            }

            await firebaseCreateUserDoc(response.user.uid, cred, 1)

        }
        
        const flipped = response.user.uid.split("").reverse().join(""), maxAge = 2 * 24 * 60 * 60
        
        cookies.set('commit', flipped, { path: '/', maxAge: maxAge })

        cookies.set('access', Hash(response.user.uid + process.env.REACT_APP_HASH_KEY), { path: '/'})

        return { error: false, data: { uid: response.user.uid, last: cookies.get('last') ?? null } };

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseRegister = async (cred) => {
 
    try {
        let response = await createUserWithEmailAndPassword(auth, cred.email, cred.passwd);

        // User Display Name
        response.user.displayName = cred.fname + ' ' + cred.lname;

        // Write User Document
        await firebaseCreateUserDoc(response.user.uid, cred, 0)

        await sendEmailVerification(response.user);

        return { error: false, data: response.user };

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseResetRequest = async (cred) => {

    try {
        await sendPasswordResetEmail(auth, cred.email);

        return { error: false, data: true }

    }   catch(err)   { return { error: true, data: cast(err.message) } }

}