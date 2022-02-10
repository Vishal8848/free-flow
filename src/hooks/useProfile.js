import { useState, useEffect } from 'react'
import { firebaseUser, firebaseFriends, firebasePostCards } from '../firebase/firebaseStore'
import { firebaseDownloadImage } from '../firebase/firebaseBulk'

const useProfile = (uid) => {
    const Abort = new AbortController();
    const [ bg, setBg ] = useState(null);
    const [ dp, setDp ] = useState(null);
    const [ user, setUser ] = useState(null);
    const [ posts, setPosts ] = useState(null);
    const [ saved, setSaved ] = useState(null);
    const [ friends, setFriends ] = useState(null);

    useEffect( () => {
        const firebaseFetch = async () => {
            let res = await firebaseUser(uid), result = null, imgs = [ false, false ];

            if(!res.error)  {
                setUser(result = res.data)
                imgs = [ result.hasBG, result.hasDP ];
                
                res = await firebaseFriends(result.friends)
                if(!res.error)  setFriends(res.data)

                res = await firebasePostCards(result.posts)
                if(!res.error) setPosts(res.data)

                res = await firebasePostCards(result.saved)
                if(!res.error) setSaved(res.data)

                if(imgs[1]) res = await firebaseDownloadImage('dps', uid);
                if(!res.error)  setDp(res.data.length && res.data)

                if(imgs[0]) res = await firebaseDownloadImage('bgs', uid);
                else res = await firebaseDownloadImage('bgs');
                if(!res.error)  setBg(res.data.length && res.data)
            }
        }
        firebaseFetch();
        return () => Abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])
    return { user, friends, posts, saved, bg, dp, setUser, setFriends, setPosts, setSaved, setBg, setDp }
}
 
export default useProfile;