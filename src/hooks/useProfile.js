// Default
import { useState, useEffect } from 'react'

// Firebase
import { firebaseUser, firebaseFriends, firebasePostCards } from '../firebase/firebaseStore'

const useProfile = (id, uid) => {
    const Abort = new AbortController();
    const [ user, setUser ] = useState(null);
    const [ posts, setPosts ] = useState(null);
    const [ saved, setSaved ] = useState(null);
    const [ friends, setFriends ] = useState(null);

    useEffect( () => {
        const firebaseFetch = async (id) => {
            let res = await firebaseUser(id), result = null;
            
            if(!res.error)  {
                setUser(result = res.data)
                
                res = await firebaseFriends(result.friends)
                if(!res.error)  setFriends(res.data)

                res = await firebasePostCards(result.posts)
                if(!res.error) setPosts(res.data)

                res = await firebasePostCards(result.saved, 'saved')
                if(!res.error) setSaved(res.data)

                return result;
            }   return null;
        }
        firebaseFetch(id).then((result) => !result && firebaseFetch(uid))
        return () => Abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    
    return { user, setUser, posts, saved, friends }
}
 
export default useProfile;