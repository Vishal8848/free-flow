import { getFirestore, enableMultiTabIndexedDbPersistence, doc, addDoc, getDoc, updateDoc, getDocs, collection, query, where, arrayUnion, arrayRemove } from "firebase/firestore"
import { firebaseDownloadImage } from "./firebaseBulk"
import firebase from './firebase'

let store = getFirestore(firebase);

export const cast = (data) => { return data.substring(data.lastIndexOf('(') + 1, data.lastIndexOf(')')) }

export const getIndexByValue = (array, key, value) => {
    for(let i = 0; i < array.length; i++)
        if(array[i][key] === value) 
            return i
    return null
}

export const firebaseEnablePersistence = async () => {

    try {
        await enableMultiTabIndexedDbPersistence(store);

        console.log("Persistence Enabled")

    }   catch(err) { }

}

export const firebaseUser = async (uid, restrict = false, noimage = false) => {

    try {
        const userDoc = await getDoc(doc(store, 'users', uid));

        if(userDoc.exists())   {

            let user = userDoc.data(), DP = null, BG = null;

            if(!noimage)  {
                if(user.hasDP) DP = await firebaseDownloadImage('dps', uid);
                if(DP && !DP.error)   user.dp = DP.data
            }
            
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

            if(!res.error)  friends[index] = { ...friends[index], ...res.data }

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
        let posts = [], unique = []

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
            unique = posts.map(post => post.creator).filter((v, i, a) => a.indexOf(v) === i)
            for(const uid of unique)    {
                const res = await firebaseUser(uid, true);
    
                if(!res.error)
                    posts = posts.map(post => post.creator === uid ? { ...post, ...res.data } : { ...post })
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
        let posts = [], unique = [], friendsPostsQuery = null;

        const postsQuery = query(collection(store, 'posts'), where('private', '==', false))

        friendsPostsQuery = query(collection(store, 'posts'), where('private', '==', true), where('creator', 'in', friends))            
        
        const postsSnapshot = await getDocs(postsQuery);
        const friendsPosts = await getDocs(friendsPostsQuery);

        postsSnapshot.forEach(doc => posts.push({ pid: doc.id, ...doc.data() }) )

        friendsPosts.forEach(doc => posts.push({ pid: doc.id, ...doc.data() }) )

        unique = posts.map(post => post.creator).filter((v, i, a) => a.indexOf(v) === i)

        for(const uid of unique)    {
            const res = await firebaseUser(uid, true);
            if(!res.error)
                posts = posts.map(post => post.creator === uid ? { ...post, ...res.data } : { ...post })
        }

        for(const post of posts)   {

            const index = getIndexByValue(posts, 'pid', post.pid)
            const uniqueComments = post.comments.map(comment => comment.commenter).filter((v, i, a) => a.indexOf(v) === i);
            
            for(const uid of uniqueComments)    {
                const res = await firebaseUser(uid, true, true);
                if(!res.error)
                    posts[index].comments = posts[index].comments.map(comment => comment.commenter === uid ? { ...comment, ...res.data } : { ...comment })
            }

        }

        if(posts.length > 0)    {

            const postsWithImage = posts.filter(post => post.hasImage);

            for(const post of postsWithImage)   {
                const res = await firebaseDownloadImage('posts', post.pid)
                const index = getIndexByValue(posts, 'pid', post.pid)

                if(!res.error)  posts[index].URL = res.data;
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

        const trendQuery = query(collection(store, 'posts'), where('private', '==', false))

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

        if(!res.error) posts[0] = { ...posts[0], ...res.data }

        return { error: false, data: posts[0] }
        
    }   catch(err) { return { error: true, data: cast(err.message) } }

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
            const othersQuery = query(collection(store, 'friend-requests'), where('fid', '==', uid))
            const othersSnapshot = await getDocs(othersQuery);
            othersSnapshot.forEach(request => requests.push({ ...request.data() }))

            for(const req of requests)  {
                const id = req.uid === uid ? req.fid : req.uid, me = req.uid === uid;
                const res = await firebaseUser(id, true);
                const index = getIndexByValue(requests, me ? 'fid' : 'uid', id)

                if(!res.error)  requests[index] = { ...requests[index], ...res.data }
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

            if(!res.error)  users[index] = { ...users[index], ...res.data }

        }

        return { error: false, data: users }

    }   catch(err) { return { error: true, data: cast(err.message) } }
}

export const firebaseUpdate = async (uid, type) => {

    try {
        await addDoc(collection(store, 'updates'), {
            uid: uid,
            type: type,
            createdAt: Date.now().toString()
        })

    }   catch(err)  { return { error: true, data: cast(err.message) } }

}

export const firebaseChatQuery = () => query(collection(store, 'chat'))

export const firebaseUpdateQuery = (friends) => query(collection(store, 'updates'), where('uid', 'in', friends))