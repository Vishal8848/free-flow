import { doc, addDoc, getDoc, updateDoc, getDocs, collection, query, where, arrayUnion, arrayRemove, enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore"
import { firebaseDownloadImage } from "./firebaseBulk"
import firebase from './firebase'

// let store = getFirestore(firebase);
const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

const store =  initializeFirestore(firebase, { cacheSizeBytes: CACHE_SIZE_UNLIMITED });

enableIndexedDbPersistence(store)
.then(() => console.log("Offline mode enabled"))
.catch(err => console.log(cast(err.message)))


export const getIndexByValue = (array, key, value) => {
    for(let i = 0; i < array.length; i++)
        if(array[i][key] === value) 
            return i
    return null
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
                    fid: doc.id,
                    list: friend.friends
                })
            }
        })

        for(const friend of friends)    {
            const res = await firebaseUser(friend.fid, true);
            const index = getIndexByValue(friends, 'fid', friend.fid);

            if(!res.error)  {
                friends[index].name = res.data.name;
                friends[index].theme = res.data.theme;
                friends[index].dp = res.data.dp;
            }

        }

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
        let posts = [], friendsPostsQuery = null;

        const postsQuery = await query(collection(store, 'posts'), where('private', '==', false))

        friendsPostsQuery = await query(collection(store, 'posts'), where('private', '==', true), where('creator', 'in', friends))            
        
        const postsSnapshot = await getDocs(postsQuery);
        const friendsPosts = await getDocs(friendsPostsQuery);

        postsSnapshot.forEach(doc => posts.push({ pid: doc.id, ...doc.data() }) )

        friendsPosts.forEach(doc => posts.push({ pid: doc.id, ...doc.data() }) )

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
                const cIndex = getIndexByValue(post.comments, 'commentedAt', comment.commentedAt)

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

export const firebaseAddComment = async (pid, data) => {

    try {
        await updateDoc(doc(store, 'posts', pid), {
            comments: arrayUnion({ comment: data.comment, commenter: data.commenter, commentedAt: data.commentedAt }),
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

export const firebaseChat = async () => {

    try {
        let chat = [];

        const chatQuery = await query(collection(store, 'chat'));

        const chatSnapshot = await getDocs(chatQuery);

        chatSnapshot.forEach(message => chat.push({ mid: message.id, ...message.data() }))

        for(const message of chat)  {
            const res = await firebaseUser(message.uid, true);
            const index = getIndexByValue(chat, 'mid', message.mid)

            if(!res.error)  {
                chat[index].name = res.data.name;
                chat[index].theme = res.data.theme;
                chat[index].dp = res.data.dp;
            }
        }

        chat = chat.sort((x, y) => { return parseInt(x.createdAt) - parseInt(y.createdAt) })

        return { error: false, data: chat }

    }   catch(err) { return { error: false, data: cast(err.message) } }

}

export const firebaseCreateMessage = async (msg) => {

    try {
        await addDoc(collection(store, 'chat'), {
            uid: msg.uid,
            content: msg.content,
            createdAt: msg.createdAt
        })

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseMakeRequest = async (uid, fid) => {

    try {
        await addDoc(collection(store, 'friend-requests'), {
            uid: uid,
            fid: fid,
            status: 1,
            createdAt: Date.now().toString()
        })

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseFriendRequests = async (uid, restrict = true) => {

    try {
        let requests = []

        const requestsQuery = query(collection(store, 'friend-requests'), where('uid', '==', uid))

        const requestsSnapshot = await getDocs(requestsQuery);

        requestsSnapshot.forEach(request => requests.push({ ...request.data() }))

        if(!restrict)   {
            const otherRequestsQuery = query(collection(store, 'friend-requests'), where('fid', '==', uid))
            const otherRequestsSnapshot = await getDocs(otherRequestsQuery);
            otherRequestsSnapshot.forEach(request => requests.push({ ...request.data() }))

            for(const req of requests)  {
                const id = req.uid === uid ? req.fid : req.uid, me = req.uid === uid;
                const index = getIndexByValue(requests, me ? 'fid' : 'uid', id)
                const res = await firebaseUser(id, true);

                if(!res.error)  {
                    requests[index].name = res.data.name;
                    requests[index].theme = res.data.theme;
                    requests[index].dp = res.data.dp;
                }
            }

        }

        return { error: false, data: requests }

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseUpdateRequest = async (uid, fid) => {

    try {
        let request = null;

        const requestQuery = query(collection(store, 'friend-requests'), where('uid', '==', fid), where('fid', '==', uid));

        const requestSnapshot = await getDocs(requestQuery);

        requestSnapshot.forEach(req => request = req.id);

        await updateDoc(doc(store, 'friend-requests', request), { status: 2 })

        await updateDoc(doc(store, 'users', uid), { friends: arrayUnion(fid) })
        
        await updateDoc(doc(store, 'users', fid), { friends: arrayUnion(uid) })

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseSearchUsers = async (uid) => {

    try {
        let users = []

        const usersQuery = query(collection(store, 'users'));

        const usersSnapshot = await getDocs(usersQuery);

        const reqs = await firebaseFriendRequests(uid);

        const setIsFriend = (fid) => {
            if(reqs.data.length > 0) {
                const index = getIndexByValue(reqs.data, 'fid', fid);
                console.log(reqs.data)
                return index !== null ? reqs.data[index].status : 0
            }   return 0
        }

        usersSnapshot.forEach(user => user.id !== uid && users.push({ 
            uid: user.id,
            isFriend: user.data().friends.some(friend => friend === uid) ? 2 : setIsFriend(user.id)
        }))

        for(const user of users)    {
            const res = await firebaseUser(user.uid, true);
            const index = getIndexByValue(users, 'uid', user.uid)

            if(!res.error)  {
                users[index].name = res.data.name;
                users[index].theme = res.data.theme;
                users[index].dp = res.data.dp;
            }

        }

        return { error: false, data: users }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}