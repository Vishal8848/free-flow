import Details from '../components/Details'
import Stats from '../components/Stats'

const Profile = () => {
    return ( 
        <div className="container-fluid profile rounded">
            <div className="profile-header m-auto border shadow">

                <div className="profile-bg bg-dark border-bottom">
                    <div className="pic-edit fw-bold pt-3">
                        <i className="fas fa-camera fa-lg ms-3 me-2"></i> 
                        Edit Background
                    </div>
                </div>

                <div className="profile-info bg-light py-3 border">
                    <Stats/>
                    
                    <div className="profile-details border-start ps-md-5 ps-3">
                        <Details/>
                    </div>
                </div>

                <div className="profile-pic border shadow">
                    <div className="profile-initial">VP</div>
                    <div className="pic-edit fw-bold pt-3">
                        <i className="fas fa-camera fa-lg me-2"></i> Edit Picture
                    </div>
                </div>

            </div>

            <div className="profile-body m-auto">

            </div>
        </div>
    );
}
 
export default Profile;