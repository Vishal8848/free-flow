import { useState, useEffect } from 'react'
import { firebaseUser, firebaseFriends, firebasePosts } from '../firebase/firebaseStore'

const useProfile = (uid) => {
    const Abort = new AbortController();
    const [ user, setUser ] = useState(null);
    const [ posts, setPosts ] = useState(null);
    const [ saved, setSaved ] = useState(null);
    const [ friends, setFriends ] = useState(null);

    useEffect( () => {
        const firebaseFetch = async () => {
            let res = await firebaseUser(uid);

            if(!res.error)  {
                setUser(res.data)
                
                res = await firebaseFriends(res.data.friends)
                if(!res.error)  setFriends(res.data)

                res = await firebasePosts(res.data.posts)
                if(!res.error) setPosts(res.data)

                res = await firebasePosts(res.data.saved)
                if(!res.error) setSaved(res.data)
            }
        }
        firebaseFetch();
        return () => Abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])
    return { user, friends, posts, saved, setUser, setFriends, setPosts, setSaved }
}
 
export default useProfile;