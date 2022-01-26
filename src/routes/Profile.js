import { useState } from 'react'
import PostCard from '../components/profile/PostCard'
import Details from '../components/profile/Details'
import Friends from '../components/profile/Friends'
import Stats from '../components/profile/Stats'
import User from '../components/profile/User'

const Posts = () => {
    return ( 
        <div className="post-set">
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
        <div className="saved-posts">
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
            <PostCard save={true}/>
        </div>
    );
}

const Profile = () => {

    let [ active, setActive ] = useState([ true, false, false, false ]);

    const setActiveState = (state) => {
        active = [ false, false, false, false ];
        active[state] = true;
        setActive([...active]);
    }

    return ( 
        <div className="container-md m-auto profile rounded">
            <div className="profile-header m-auto border shadow">

                <div className="profile-bg bg-dark border-bottom">
                    <div className="pic-edit fw-bold pt-3">
                        <i className="fas fa-camera fa-lg ms-3 me-2"></i> 
                        Edit Background
                    </div>
                </div>

                <div className="profile-info bg-light pt-4 pb-5 border">
                    <Stats/>
                    <Details/>
                </div>

                <div className="profile-pic border shadow">
                    <div className="profile-initial">VP</div>
                    <div className="pic-edit fw-bold pt-3 rounded-pill">
                        <i className="fas fa-camera fa-lg me-2"></i> Edit Picture
                    </div>
                </div>

            </div>

            <div className="profile-body m-auto">
                <div className="profile-nav bg-light border shadow">
                    <ul className="pnav-list my-2 mx-3">
                        <li className={`pnav-item py-3 text-dark ${ active[0] ? 'active border' : '' }`} onClick={() => setActiveState(0)}>
                            <i className="fas fa-user fa-lg"></i>
                            <span className='ps-2'>Profile</span>
                        </li>
                        <li className={`pnav-item py-3 text-danger ${ active[1] ? 'active border' : '' }`} onClick={() => setActiveState(1)}>
                            <i className="fas fa-heart fa-lg"></i>
                            <span className='ps-2'>Friends</span>
                        </li>
                        <li className={`pnav-item py-3 text-primary ${ active[2] ? 'active border' : '' }`} onClick={() => setActiveState(2)}>
                            <i className="fas fa-paper-plane fa-lg"></i>
                            <span className='ps-2'>Posts</span>
                        </li>
                        <li className={`pnav-item py-3 text-success ${ active[3] ? 'active border' : '' }`} onClick={() => setActiveState(3)}>
                            <i className="fas fa-bookmark fa-lg"></i>
                            <span className='ps-2'>Saved</span>
                        </li>
                    </ul>
                </div>

                <div className="profile-content mt-3 p-3 bg-light border shadow">
                    
                    <div className="profile-title mt-5 mb-3">
                        <span className="fs-3 fw-bold">
                            { active[0] ? "Profile" : active[1] ? "Friends" : active[2] ? "Posts" : active[3] ? "Saved" : "Profile" }
                        </span>
                    </div>

                    {
                        active[0] ? <User /> :
                        active[1] ? <Friends /> :
                        active[2] ? <Posts/> :
                        active[3] ? <Saved/> : <User />
                    }

                </div>
            </div>
        </div>
    );
}
 
export default Profile;