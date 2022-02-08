import { getFirestore, doc, getDoc, updateDoc, getDocs, collection, query } from "firebase/firestore/lite"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import firebase from './firebase'

const bulk = getStorage(firebase);
const store = getFirestore(firebase);
const cast = (data) => { return data.split('(')[1].slice(0, -2) }

export const firebaseUser = async (uid) => {

    try {
        const user = await getDoc(doc(store, 'users', uid));

        return user.exists() ? { error: false, data: user.data() } : { error: true, data: "store/user-not-found" }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseFriends = async (uids) => {

    try {
        let friends = []

        const usersQuery = query(collection(store, 'users'));

        const usersSnapshot = await getDocs(usersQuery);

        usersSnapshot.forEach(doc => {
            const friend = doc.data();
            if(uids.some(uid => uid === doc.id))    {
                friends.push({
                    uid: doc.id,
                    photoURL: friend.photoURL,
                    name: friend.fname + ' ' + friend.lname,
                    list: friend.friends
                })
            }
        })

        return { error: false, data: friends }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebasePosts = async (pids) => {

    try {
        let posts = []

        const usersQuery = query(collection(store, 'users'));

        const usersSnapshot = await getDocs(usersQuery);

        usersSnapshot.forEach(doc => {
            const friend = doc.data();
            if(pids.some(pid => pid === doc.id))    {
                posts.push({
                    photoURL: friend.photoURL,
                    name: friend.fname + ' ' + friend.lname,
                    list: friend.friends
                })
            }
        })

        return { error: false, data: posts }

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseUpdateActivity = async (uid) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            lastActive: Date.now().toString(),
            updatedAt: Date.now().toString()
        })

    }   catch(err)  { return { error: false, data: cast(err.message) } }
}

export const firebaseUpdateUser = async (uid, cred) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            ...cred,
            updatedAt: Date.now().toString()
        })

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseUploadImage = async (id, blob, type) => {

    try {
        const imageRef = ref(bulk, type + '/' + id);

        await uploadBytes(imageRef, blob);

        if(type === 'bgs' || type === 'dps')    {
            await updateDoc(doc(store, 'users', id), {
                hasBG: type === 'bgs',
                hasDP: type === 'dps',
                updatedAt: Date.now().toString()
            })
        }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseDownloadImage = async (type, id = null) => {

    try {
        const imageRef = ref(bulk, type + '/' + (id ? id : `default-${type.slice(0, -1)}-min.jpg`))

        const URL = await getDownloadURL(imageRef);

        return { error: false, data: URL }

    }   catch(err) { return { error: true, data: err.message } }
}