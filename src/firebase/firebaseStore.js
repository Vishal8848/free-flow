import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"
import firebase from './firebase'

const store = getFirestore(firebase);
const cast = (data) => { return data.split('(')[1].slice(0, -2) }

const firebaseStore = () => { return store }

export const firebaseUser = async (uid) => {

    try {
        const user = await getDoc(doc(store, 'users', uid));

        return user.exists() ? { error: false, data: user.data() } : { error: true, data: "store/user-not-found" }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseUpdateActivity = async (uid) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            lastActive: Date.now(),
            updatedAt: Date.now()
        })

    }   catch(err)  { return { error: false, data: cast(err.message) } }
}

export const firebaseUpdateUser = async (uid, cred) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            ...cred,
            updatedAt: Date.now()
        })

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export default firebaseStore;