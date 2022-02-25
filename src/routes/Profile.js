import { useState, useEffect, useRef, useContext } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { getInitial, formatBytes } from '../components/Extras'
import { firebaseUploadImage } from '../firebase/firebaseBulk'
import PostCard from '../components/profile/PostCard'
import Content from '../components/profile/Content'
import Friends from '../components/profile/Friends'
import Visitor from '../components/profile/Visitor'
import User from '../components/profile/User'
import useProfile from '../hooks/useProfile'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AuthContext } from '../App'
import profileImg from '../assets/profile.png'
import creationImg from '../assets/creation.png'
import savedImg from '../assets/saved.png'

// Created Posts 
const Posts = ({ user, data }) => {
    return ( 
        <div className="post-set theme-middle">
            {   (data && data.length > 0) ?
                data.sort((x, y) => parseInt(y.createdAt) - parseInt(x.createdAt)).map(post => (
                    <PostCard user={user} data={post} key={post.createdAt}/>
                )) :
                <div className="notice text-muted theme-inner px-5" style={{ width: "100%" }}>
                    { creationImg && <img src={creationImg} alt="Creation" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Your Waves</strong><br/>
                    The waves you created live here
                </div>
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
                    <PostCard data={post} save={true} key={post.creator}/>
                ))  :
                <div className="notice text-muted theme-inner px-5" style={{ width: "100%" }}>
                    { savedImg && <img src={savedImg} alt="Saved" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Saved Waves</strong><br/>
                    The waves you saved live here
                </div>
            }
        </div>
    );
}

const Profile = () => {

    // Requested Profile UID
    const { uid: routeId } = useParams();

    // Auth Handler
    const setRoute = useNavigate();
    const { auth } = useContext(AuthContext);

    let uid = routeId === 'default' ? auth.data && auth.data.uid : routeId.split("").reverse().join("")

    useEffect(() => { if(!auth.status) setRoute('/') }, [auth, setRoute]);

    // Profile Data
    const { user, setUser, posts, friends, saved } = useProfile(uid, auth.data && auth.data.uid);
    const [ editor, setEditor ] = useState(false);
    const [ status, setStatus ] = useState(null);
    const [ dp, setDp ] = useState(user && user.dp)
    const [ bg, setBg ] = useState(user && user.bg)

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
        const fileSize = formatBytes(e.target.files[0].size);
        if(parseFloat(fileSize.split(' ')[0]) < 500)  {
            firebaseUploadImage(auth.data.uid, e.target.files[0], 'bgs').then(() => {
                setBg(URL.createObjectURL(e.target.files[0]))
                setStatus({ theme: 'success', icon: 'check', message: 'Nice.. A classic background' })
            })
        }   else setStatus({ theme: 'danger', icon: 'times', message: ['Oops! Try something less than ', <strong>500KB</strong>, '. Current: ', <strong>{ fileSize }</strong>] })
    }

    // Update Profile Picture
    const setProfilePicture = (e) => {
        e.preventDefault();
        const fileSize = formatBytes(e.target.files[0].size);
        if(parseFloat(fileSize.split(' ')[0]) < 500)  {
            firebaseUploadImage(auth.data.uid, e.target.files[0], 'dps').then(() => {
                setDp(URL.createObjectURL(e.target.files[0]))
                setStatus({ theme: 'success', icon: 'check', message: 'Yep.. That\'s admirable' })
            })
        }   else setStatus({ theme: 'danger', icon: 'times', message: ['Oops! Try something less than ', <strong>500KB</strong>, '. Current: ', <strong>{ fileSize }</strong>] })
    }

    return ( <>
        <Header setUserCount={null}/>
        <div className="container-fluid profile theme-outer">
        
            <><div className="profile-header m-auto mt-3 shadow theme-middle animate__animated animate__slideInDown">
                { user &&
                <div className="profile-bg" style={{ background: `url(${bg ? bg : user.bg}) center center / cover no-repeat` }}>
                    {   auth.data && (uid === auth.data.uid) &&
                        <><input type="file" name="bg" id="bg" accept="image/*" onChange={(e) => setBackground(e)} style={{ width: "0", visibility: "hidden" }}/>
                        <label htmlFor="bg" className="pic-edit">
                            <div className="fw-bold pt-3">
                                <i className="fas fa-camera fa-lg ms-3 me-2"></i> 
                                Edit Background
                            </div>
                        </label></>
                    }
                </div> }
                { user && <>
                <div className="profile-info pt-4 pb-5 theme-middle">
                    <Content data={{ 
                        name: user.fname + ' ' + user.lname,
                        friends: user.friends.length - 1,
                        description: user.description,
                        posts: user.posts.length, 
                        likes: user.likes.length
                    }} status={auth.data && auth.data.uid === uid ? status : null}/>
                </div>

                <div className={`profile-pic bg-${user.theme} border border-secondary`} style={{ background: `url(${dp ? dp : user.dp}) center center / cover no-repeat` }}>
                    {   !(dp || user.dp) &&
                        <div className="profile-initial">
                            { getInitial(user.fname + ' ' + user.lname) }
                        </div>
                    }
                    {   auth.data && (uid === auth.data.uid) &&
                        <><input type="file" name="dp" id="dp" accept="image/*" onChange={(e) => setProfilePicture(e)} style={{ width: "0", visibility: "hidden" }}/>
                        <label htmlFor="dp" className="pic-edit rounded-pill">
                            <div className="fw-bold pt-3">
                                <i className="fas fa-camera fa-lg me-2"></i> Edit Picture
                            </div>
                        </label></>
                    }
                </div>
                </>}

            </div>

            <div className="profile-body m-auto shadow position-relative theme-middle">
                { user &&
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
                </div> }

                <div className="profile-content mt-3 p-3 theme-middle">
                    
                    <div className="profile-title mt-5">
                        <span className="fs-3">
                            { active[0] ? "Profile" : active[1] ? "Posts" : active[2] ? "Friends" : active[3] ? "Saved" : "Profile" }
                        </span>
                    </div>

                    {   auth.data && (uid === auth.data.uid) &&
                        <div className="editor-check form-check theme-switch form-switch pb-2">
                            <label className="form-check-label me-5 pt-1 pe-2" htmlFor="editorMode">Edit</label>
                            <input className="form-check-input" role="switch" type="checkbox" id="editorMode"
                                checked={editor} onChange={(e) => { setEditor(e.target.checked); if(active !== 0) setActiveState(0) } }/>
                        </div>
                    }

                    {   (user && posts && friends && saved) ?
                        active[0] ? ((auth.data && (uid === auth.data.uid) && editor) ?
                        <User auth={auth.data} data={{
                            uid: uid,
                            occupation: user.occupation,
                            description: user.description,
                            location: user.location,
                            education: user.education,
                            dob: user.dob,
                            hobbies: user.hobbies
                        }} setStatus={setStatus} setProfile={setUser} setEditor={setEditor}/> :
                        <Visitor data={{
                            occupation: user.occupation,
                            location: user.location,
                            education: user.education,
                            dob: user.dob,
                            hobbies: user.hobbies,
                            latest: (friends && friends.length > 1) ? friends[friends.length - 1] : null
                        }}/>) :
                        active[1] ? <Posts user={{
                            name: user.fname + ' ' + user.lname,
                            theme: user.theme,
                            dp: user.dp
                        }} data={posts}/> :
                        active[2] ? <Friends user={{
                            uid: uid,
                            friends: user.friends
                        }} data={friends}/> :
                        active[3] && <Saved data={saved}/> :
                        <div className="notice text-muted theme-inner px-5">
                            { profileImg && <img src={profileImg} alt="Profile" width="150px" height="150px" style={{ marginBottom: "50px" }}/> }
                            <br/><strong>Your Profile</strong><br/>
                            This is where everything starts
                        </div>
                    }

                </div>
            </div></>
        
        </div>
        <Footer />
    </>);
}
 
export default Profile;