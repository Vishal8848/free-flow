import Avatar from "../Avatar";

const Details = () => {
    return (
        <div className="profile-details border-start ps-md-5 ps-3">
            
            {/* Profile Name */}
            <div className="profile-name">
                <strong className="fs-2 align-middle" style={{ WebkitTextStroke: "1px" }}>Vishal Pranav</strong>
            </div>

            {/* Profile Location */}
            <div className="profile-location">
                <strong className="fs-6 text-muted">
                    Chennai
                    <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                    TN
                    <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                    India
                </strong>
            </div>

            {/* Profile Description */}
            <div className="profile-desc text-muted pe-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quod nam officiis? Ratione quos voluptatem voluptates soluta molestiae temporibus fuga libero animi inventore ad. Ratione assumenda qui fuga ducimus quia?
            </div>

            {/* Profile Friends */}
            <div className="friend-avatars mt-2">
                <span><Avatar name="Vishal Pranav" scale="sm" theme="primary"/></span>
                <Avatar name="Erling Haaland" scale="sm" theme="danger"/>
                <Avatar name="Master Mind" scale="sm" theme="dark"/>
                <Avatar name="Robert Maverick" scale="sm" theme="success"/>
                <Avatar name="Henry Coleson" scale="sm" theme="primary"/>
                <span><i className="fas fa-plus text-muted pt-1 align-middle ms-2"></i></span>
            </div>
            
        </div>
    );
}
 
export default Details;