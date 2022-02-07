import { useState, useEffect, useRef, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getInitial, Loader } from '../components/Extras'
import PostCard from '../components/profile/PostCard'
import Details from '../components/profile/Details'
import Friends from '../components/profile/Friends'
import Stats from '../components/profile/Stats'
import User from '../components/profile/User'
import useProfile from '../hooks/useProfile'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext } from '../App'

// Created Posts 
const Posts = ({ data }) => {
    return ( 
        <div className="post-set theme-middle">
            {   (data && data.length > 0) ?
                data.map(post => (
                    <PostCard key={post}/>
                )) : "You have not created any posts"
            }
        </div>
    );
}

// Saved Posts
const Saved = ({ data }) => {
    return ( 
        <div className="saved-posts theme-middle">
            {   (data && data.length > 0) ?
                data.map(post => (
                    <PostCard save={true} key={post}/>
                ))  : "You have not saved any posts"

            }
        </div>
    );
}

const Profile = () => {

    // Requested Profile UID
    const { uid } = useParams();

    // Auth Handler
    const setRoute = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => { if(!user.auth) setRoute('/') }, [user.auth, setRoute]);

    // Profile Data
    const profile = useProfile(uid);
    const [ bg, setBg ] = useState(profile.user && profile.bg)

    // Active Profile Component
    const [ params ] = useSearchParams();
    const type = params.get('type');
    const typeRef = useRef(type);
    let [ active, setActive ] = useState([ type === null, type === 'posts', type === 'friends', type === 'saved' ]);

    // Update Profile State
    useEffect(() => {
        typeRef.current = params.get('type');
        setActive([ typeRef.current === null, typeRef.current === 'posts', typeRef.current === 'friends', typeRef.current === 'saved' ]);
    }, [params])

    // Profile Active Selector
    const setActiveState = (state) => {
        active = [ false, false, false, false ];
        active[state] = true;
        setActive([...active]);
    }

    // Update Background Image
    const setBackground = (e) => {
        e.preventDefault();
        setBg(URL.createObjectURL(e.target.files[0]))
    }

    return ( <>
        <Header />
            <div className="container-md m-auto profile rounded theme-outer">
            {   profile.user ? 
                <><div className="profile-header m-auto theme-middle">

                    <div className="profile-bg" style={{ background: `url(${bg ? bg : profile.bg}) center center / cover no-repeat` }}>
                        <input type="file" name="bg" id="bg" accept="image/*" onChange={(e) => setBackground(e)} style={{ visibility: "hidden" }}/>
                        <label htmlFor="bg" className="pic-edit">
                            <div className="fw-bold pt-3">
                                <i className="fas fa-camera fa-lg ms-3 me-2"></i> 
                                Edit Background
                            </div>
                        </label>
                    </div>

                    <div className="profile-info pt-4 pb-5 theme-middle">
                        <Stats data={{ 
                            friends: profile.user.friends.length, 
                            posts: profile.user.posts.length, 
                            likes: profile.user.likes.length 
                        }}/>

                        <Details data={{ 
                            name: profile.user.fname + ' ' + profile.user.lname, 
                            location: profile.user.location, 
                            description: profile.user.description, 
                            friends: profile.user.friends
                        }}/>
                    </div>

                    <div className={`profile-pic bg-${profile.user.theme}`}>
                        <div className="profile-initial">
                            { getInitial(profile.user.fname + ' ' + profile.user.lname) }
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
                            active[0] ? <User auth={user.data} data={{
                                uid: uid,
                                occupation: profile.user.occupation,
                                description: profile.user.description,
                                location: profile.user.location,
                                education: profile.user.education,
                                dob: profile.user.dob,
                                hobbies: profile.user.hobbies
                            }} updateProfile={profile.setUser}/> : 
                            active[1] ? <Posts data={profile.posts} updatePosts={profile.setPosts}/> :
                            active[2] ? <Friends data={profile.friends} updateFriends={profile.setFriends}/> :
                            active[3] && <Saved data={profile.saved} updateSaved={profile.setSaved}/>
                        }

                    </div>
                </div></> : <Loader show={true}/>
            }
            </div>
        <Footer />
    </>);
}
 
export default Profile;