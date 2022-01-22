import Details from '../components/Details'
import Stats from '../components/Stats'

const Profile = () => {
    return ( 
        <div className="container-md border m-auto profile rounded">
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
                    <div className="pic-edit fw-bold pt-3">
                        <i className="fas fa-camera fa-lg me-2"></i> Edit Picture
                    </div>
                </div>

            </div>

            <div className="profile-body m-auto">
                <div className="profile-nav bg-light border shadow">
                    <ul className="pnav-list py-2 px-3">
                        <li className="pnav-item py-3 text-dark">
                            <i className="fas fa-user fa-lg me-2"></i>
                            <span>Profile</span>
                        </li>
                        <li className="pnav-item py-3 text-danger">
                            <i className="fas fa-heart fa-lg me-2"></i>
                            <span>Friends</span>
                        </li>
                        <li className="pnav-item py-3 text-primary">
                            <i className="fas fa-paper-plane fa-lg me-2"></i>
                            <span>Posts</span>
                        </li>
                        <li className="pnav-item py-3 text-success">
                            <i className="fas fa-bookmark fa-lg me-2"></i>
                            <span>Saved</span>
                        </li>
                        <li className="pnav-item py-3 text-secondary">
                            <i className="fas fa-sun fa-lg me-2"></i>
                            <span>Settings</span>
                        </li>
                    </ul>
                </div>

                <div className="profile-content mt-3 p-5 bg-light border shadow">
                    
                </div>
            </div>
        </div>
    );
}
 
export default Profile;