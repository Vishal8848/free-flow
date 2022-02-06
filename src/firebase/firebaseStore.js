import { getFirestore, doc, getDoc } from "firebase/firestore/lite"
import firebase from './firebase'

const store = getFirestore(firebase);
const cast = (data) => { return data.split('(')[1].slice(0, -2) }

export const firebaseUser = async (uid) => {

    try {
        const user = await getDoc(doc(store, 'users', uid));

        return user.exists() ? { error: false, data: user.data() } : { error: true, data: "store/user-not-found" }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}