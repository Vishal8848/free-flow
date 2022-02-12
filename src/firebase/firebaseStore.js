import { getFirestore, doc, addDoc, getDoc, updateDoc, getDocs, collection, query, arrayUnion } from "firebase/firestore/lite"
import firebase from './firebase'

const store = getFirestore(firebase);
const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

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
                    hadDP: friend.hasDP,
                    name: friend.fname + ' ' + friend.lname,
                    list: friend.friends
                })
            }
        })

        return { error: false, data: friends }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseCreatePost = async (data) => {

    try {
        const newPost = await addDoc(collection(store, 'posts'), {
            creator: data.uid,
            private: data.private === 'private',
            title: data.title,
            content: data.content,
            hasImage: data.hasImage,
            likes: [],
            saved: [],
            comments: [],
            createdAt: Date.now().toString()
        })

        await updateDoc(doc(store, 'users', data.uid), {    
            posts: arrayUnion(newPost.id.toString()),
            updatedAt: Date.now().toString()
        })

        return { error: false, data: newPost.id }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebasePostCards = async (pids) => {

    try {
        let posts = []

        const postsQuery = query(collection(store, 'posts'));

        const postsSnapshot = await getDocs(postsQuery);

        postsSnapshot.forEach(doc => {
            const post = doc.data();
            if(pids.some(pid => pid === doc.id))    {
                posts.push({
                    pid: doc.id,
                    creator: post.creator,
                    title: post.title,
                    description: post.description,
                    hasImage: post.hasImage,
                    totalLikes: post.likes.length,
                    createdAt: post.createdAt
                })
            }
        })

        return { error: false, data: posts }

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseUpdateUser = async (uid, cred) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            ...cred,
            updatedAt: Date.now().toString()
        })

    }   catch(err) { return { error: true, data: cast(err.message) } }
}