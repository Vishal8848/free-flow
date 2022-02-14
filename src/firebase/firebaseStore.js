import { getFirestore, doc, addDoc, getDoc, updateDoc, getDocs, collection, query, where, arrayUnion, arrayRemove } from "firebase/firestore/lite"
import { firebaseDownloadImage } from "./firebaseBulk";
import firebase from './firebase'

const store = getFirestore(firebase);
const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

const getIndexByValue = (array, key, value) => {
    for(let i = 0; i < array.length; i++)
        if(array[i][key] === value) 
            return i
    return 0
}

export const firebaseUser = async (uid, restrict = false) => {

    try {
        const userDoc = await getDoc(doc(store, 'users', uid));

        if(userDoc.exists())   {

            let user = userDoc.data(), DP = null, BG = null;

            if(user.hasDP) DP = await firebaseDownloadImage('dps', uid);
            if(DP && !DP.error)   user.dp = DP.data
            
            if(!restrict)   {
                if(user.hasBG) BG = await firebaseDownloadImage('bgs', uid);
                else BG = await firebaseDownloadImage('bgs');
                if(BG && !BG.error)   user.bg = BG.data
            }

            return (restrict) ? 
                { error: false, data: { 
                    name: user.fname + ' ' + user.lname,
                    dp: user.dp ? user.dp : null,
                    theme: user.theme
                } } : 
                { error: false, data: user }

        }   else return { error: true, data: 'store/user-not-found' }

    }   catch(err)  { return { error: true, data: err.message } }

}

export const firebaseUpdateUser = async (uid, cred) => {

    try {
        await updateDoc(doc(store, 'users', uid), {
            ...cred,
            updatedAt: Date.now().toString()
        })

    }   catch(err) { return { error: true, data: cast(err.message) } }
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

export const firebasePostCards = async (pids, type = null) => {

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
                    content: post.content,
                    hasImage: post.hasImage,
                    totalLikes: post.likes.length,
                    createdAt: post.createdAt
                })
            }
        })

        if(type === 'saved')    {
            for(const post of posts)    {
                const res = await firebaseUser(post.creator, true);
    
                if(!res.error)  {
                    const index = getIndexByValue(posts, 'creator', post.creator)
                    posts[index].name = res.data.name
                    posts[index].theme = res.data.theme
                    posts[index].dp = res.data.dp
                }
            }
        }

        if(posts.length > 0)    {

            const postsWithImage = posts.filter(post => post.hasImage);

            for(const post of postsWithImage)   {
                const res = await firebaseDownloadImage('posts', post.pid)

                if(!res.error)  posts[getIndexByValue(posts, 'pid', post.pid)].URL = res.data;
            }

        }

        return { error: false, data: posts }

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseAllPosts = async (friends) => {

    try {
        let posts = [], postsQuery = null;

        if(friends.length > 0) 
            postsQuery = await query(collection(store, 'posts'), where('private', '==', false), where('creator', 'in', friends))
        else 
            postsQuery = await query(collection(store, 'posts'), where('private', '==', false))
        
        const postsSnapshot = await getDocs(postsQuery);

        postsSnapshot.forEach(doc => {
            const post = doc.data()
            posts.push({
                pid: doc.id,
                creator: post.creator,
                private: post.private,
                title: post.title,
                content: post.content,
                hasImage: post.hasImage,
                likes: post.likes,
                saved: post.saved,
                comments: post.comments,
                createdAt: post.createdAt
            })
        })

        for(const post of posts)    {
            const res = await firebaseUser(post.creator, true);
            const pIndex = getIndexByValue(posts, 'creator', post.creator)

            if(!res.error)  {
                posts[pIndex].name = res.data.name
                posts[pIndex].theme = res.data.theme
                posts[pIndex].dp = res.data.dp
            }

            for(const comment of post.comments) {
                const res = await firebaseUser(comment.commenter, true);
                const cIndex = getIndexByValue(post.comments, 'commenter', comment.commenter)

                if(!res.error)  {
                    posts[pIndex].comments[cIndex].name = res.data.name
                    posts[pIndex].comments[cIndex].theme = res.data.theme
                    posts[pIndex].comments[cIndex].dp = res.data.dp
                }
            }
        }

        if(posts.length > 0)    {

            const postsWithImage = posts.filter(post => post.hasImage);

            for(const post of postsWithImage)   {
                const res = await firebaseDownloadImage('posts', post.pid)

                if(!res.error)  posts[getIndexByValue(posts, 'pid', post.pid)].URL = res.data;
            }

        }

        return { error: false, data: posts }

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebasePostReaction = async (pid, uid, type, action) => {

    const types = [ type === 'like', type === 'save' ]
    const actions = [ action === 'add', action === 'remove' ]

    try {

        if(types[0] && actions[0]) {
            await updateDoc(doc(store, 'posts', pid), { likes: arrayUnion(uid), updatedAt: Date.now().toString() })
            await updateDoc(doc(store, 'users', uid), { likes: arrayUnion(pid), updatedAt: Date.now().toString() })
        }

        if(types[0] && actions[1]) {
            await updateDoc(doc(store, 'posts', pid), { likes: arrayRemove(uid), updatedAt: Date.now().toString() })
            await updateDoc(doc(store, 'users', uid), { likes: arrayRemove(pid), updatedAt: Date.now().toString() })
        }

        if(types[1] && actions[0]) {
            await updateDoc(doc(store, 'posts', pid), { saved: arrayUnion(uid), updatedAt: Date.now().toString() })
            await updateDoc(doc(store, 'users', uid), { saved: arrayUnion(pid), updatedAt: Date.now().toString() })
        }

        if(types[1] && actions[1]) {
            await updateDoc(doc(store, 'posts', pid), { saved: arrayRemove(uid), updatedAt: Date.now().toString() })
            await updateDoc(doc(store, 'users', uid), { saved: arrayRemove(pid), updatedAt: Date.now().toString() })
        }

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseAddComment = async (pid, comment) => {

    try {
        await updateDoc(doc(store, 'posts', pid), {
            comments: arrayUnion(comment),
            updatedAt: Date.now().toString()
        })

    }   catch(err) { return { error: true, data: cast(err.message) } }

}

export const firebaseTrendingPost = async () => {

    try {
        let posts = [], res = null;

        const trendQuery = await query(collection(store, 'posts'))

        const trendSnapshot = await getDocs(trendQuery);

        trendSnapshot.forEach(post => posts.push({ pid: post.id, ...post.data()}))

        posts = posts.filter(post => !post.private).sort((x, y) => { 
            if(x.likes.length === y.likes.length) 
                return parseInt(x.createdAt) - parseInt(y.createdAt);
            return y.likes.length - x.likes.length;
        })

        if(posts[0].hasImage)   {
            res = await firebaseDownloadImage('posts', posts[0].pid);

            if(!res.error)  posts[0].URL = res.data
        }

        res = await firebaseUser(posts[0].creator, true);

        if(!res.error)  {
            posts[0].name = res.data.name
            posts[0].theme = res.data.theme
            posts[0].dp = res.data.dp
        }

        return { error: false, data: posts[0] }
        
    }   catch(err) { return { error: true, data: cast(err.message) } }

}