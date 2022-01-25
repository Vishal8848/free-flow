import Avatar from '../Avatar'

const Friend = () => {
    return ( 
        <div className="friend p-2 bg-light rounded border shadow-sm mt-3">
            <div className="friend-img">
                <Avatar name="Vishal Pranav" scale="square" theme="danger"/>
            </div>
            <div className="friend-desc ps-3">
                <span className="fs-5 fw-bold">Vishal Pranav</span><br/>
                <span className="fs-6 fst-italic text-muted">2 mutual friends</span>
            </div>
            <div className="friend-actions dropdown">
                <button className="btn rounded-circle py-2 px-3" data-bs-toggle="dropdown">
                    <i className="fas fa-ellipsis-v fa-lg"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-start">
                    <li className="dropdown-item">
                        <i className="far fa-user fa-lg me-2"></i>View Profile
                    </li>
                    <li className="dropdown-item">
                        <i className="far fa-user-slash fa-lg me-2"></i>Unfriend
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
const Friends = () => {
    return(
        <div className="row gx-2">
            <div className="col-md-6">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
            <div className="col-md-6">
                <Friend />
                <Friend />
                <Friend />
                <Friend />
                <Friend />
            </div>
        </div>
    );
}

export default Friends;