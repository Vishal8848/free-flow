import Avatar from '../Avatar'

const Friend = ({ side }) => {

    return ( 
        <div className={`friend p-2 bg-light rounded border shadow-sm m${side}-md-auto mt-4`}>
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
                <ul className="dropdown-menu dropdown-menu-end bg-light">
                    <li className="dropdown-item">
                        <i className="fas fa-user fa-lg me-2 text-primary"></i>View Profile
                    </li>
                    <li className="dropdown-item">
                        <i className="fas fa-ban fa-lg me-2 text-danger"></i>Unfriend
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
const Friends = () => {
    return(
        <div className="friends row">
            <div className="col-md-6">
                <Friend side='s' />
                <Friend side='s' />
                <Friend side='s' />
                <Friend side='s' />
                <Friend side='s' />
            </div>
            <div className="col-md-6">
                <Friend side='e' />
                <Friend side='e' />
                <Friend side='e' />
                <Friend side='e' />
                <Friend side='e' />
            </div>
        </div>
    );
}

export default Friends;