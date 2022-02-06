import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PostCard from '../components/profile/PostCard'
import Details from '../components/profile/Details'
import Friends from '../components/profile/Friends'
import Stats from '../components/profile/Stats'
import User from '../components/profile/User'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Inform from '../components/Inform'
import { UserContext } from '../App'

import { firebaseUpdateActivity } from '../firebase/firebaseStore'

const Posts = () => {
    return ( 
        <div className="post-set theme-middle">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
}

const Saved = () => {
    return ( 
        <div className="saved-posts theme-middle">
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
        </div>
    );
}

const Profile = () => {

    const setRoute = useNavigate();
    const { user } = useContext(UserContext);
    const name = user.data.fname + ' ' + user.data.lname;

    useEffect(() => { if(!user.auth) setRoute('/') }, [user.auth, setRoute]);

    firebaseUpdateActivity(user.data.uid)

    const [ params ] = useSearchParams();
    const type = params.get('type');
    const typeRef = useRef(type);
    let [ active, setActive ] = useState([ 
        type === null, 
        type === 'posts', 
        type === 'friends', 
        type === 'saved' 
    ]);

    useEffect(() => {
        typeRef.current = params.get('type');
        setActive([
            typeRef.current === null, 
            typeRef.current === 'posts', 
            typeRef.current === 'friends', 
            typeRef.current === 'saved' 
        ]);
    }, [params])

    // Profile Active Selector
    const setActiveState = (state) => {
        active = [ false, false, false, false ];
        active[state] = true;
        setActive([...active]);
    }

    return ( <>
        <Header />
        <div className="container-md m-auto profile rounded theme-outer">
            <div className="profile-header m-auto theme-middle">

                <div className="profile-bg bg-dark">
                    <div className="pic-edit fw-bold pt-3">
                        <i className="fas fa-camera fa-lg ms-3 me-2"></i> 
                        Edit Background
                    </div>
                </div>

                <div className="profile-info pt-4 pb-5 theme-middle">
                    <Stats data={{ friends: user.data.friends.length, posts: user.data.posts.length, likes: user.data.likes.length }}/>

                    <Details data={{ name: user.data.fname + ' ' + user.data.lname, location: user.data.location, description: user.data.description, friends: user.data.friends }}/>
                </div>

                <div className={`profile-pic bg-${user.data.theme}`}>
                    <div className="profile-initial">
                        { name.split(' ').filter((name) => name.length > 1).slice(0, 2).map((each) => each.charAt(0)).join('') }
                    </div>
                    <div className="pic-edit fw-bold pt-3 rounded-pill">
                        <i className="fas fa-camera fa-lg me-2"></i> Edit Picture
                    </div>
                </div>

            </div>

            <div className="profile-body m-auto theme-middle">

                <div className="profile-nav theme-middle shadow">
                    <ul className="pnav-list my-2 mx-3">
                        <li className={`pnav-item py-3 ${ active[0] ? 'active border' : '' }`} onClick={() => setActiveState(0)}>
                            <i className="fas fa-user fa-lg"></i>
                            <span className='ps-2'>Profile</span>
                        </li>
                        <li className={`pnav-item py-3 text-primary ${ active[1] ? 'active border' : '' }`} onClick={() => setActiveState(1)}>
                            <i className="fas fa-paper-plane fa-lg"></i>
                            <span className='ps-2'>Posts</span>
                        </li>
                        <li className={`pnav-item py-3 text-danger ${ active[2] ? 'active border' : '' }`} onClick={() => setActiveState(2)}>
                            <i className="fas fa-heart fa-lg"></i>
                            <span className='ps-2'>Friends</span>
                        </li>
                        <li className={`pnav-item py-3 text-success ${ active[3] ? 'active border' : '' }`} onClick={() => setActiveState(3)}>
                            <i className="fas fa-bookmark fa-lg"></i>
                            <span className='ps-2'>Saved</span>
                        </li>
                    </ul>
                </div>

                <div className="profile-content mt-3 p-3 theme-middle">
                    
                    <div className="profile-title mt-5 mb-3">
                        <span className="fs-3">
                            { active[0] ? "Profile" : active[1] ? "Posts" : active[2] ? "Friends" : active[3] ? "Saved" : "Profile" }
                        </span>
                    </div>

                    {
                        active[0] ? <User/> :
                        active[1] ? <Posts/> :
                        active[2] ? <Friends/> :
                        active[3] ? <Saved/> : <User/>
                    }

                </div>
            </div>

            { !user.data.lastActive && <Inform status={2}/> }
        </div>
        <Footer />
    </>);
}
 
export default Profile;