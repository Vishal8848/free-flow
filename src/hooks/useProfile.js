import { useState, useEffect } from 'react'
import { firebaseUser, firebaseFriends, firebasePostCards } from '../firebase/firebaseStore'

const useProfile = (uid = null) => {
    const Abort = new AbortController();
    const [ valid, setValid ] = useState(uid && uid.length >= 10)
    const [ user, setUser ] = useState(null);
    const [ posts, setPosts ] = useState(null);
    const [ saved, setSaved ] = useState(null);
    const [ friends, setFriends ] = useState(null);

    useEffect( () => {
        console.log("Profile")
        const firebaseFetch = async () => {
            let res = await firebaseUser(uid), result = null;
            
            if(!res.error)  {
                setUser(result = res.data)
                
                res = await firebaseFriends(result.friends)
                if(!res.error)  setFriends(res.data)

                res = await firebasePostCards(result.posts)
                if(!res.error) setPosts(res.data)

                res = await firebasePostCards(result.saved, 'saved')
                if(!res.error) setSaved(res.data)
            
            }   else setValid(false)
        }
        const start = window.performance.now();
        firebaseFetch();
        const end = window.performance.now();
        console.log(`Profile: ${end - start} ms`)
        return () => Abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])
    
    return valid ? { user, setUser, posts, saved, friends } : null
}
 
export default useProfile;