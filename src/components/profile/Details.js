import { Avatar } from "../Extras";

const Details = ({ data }) => {

    const themes = [ 'danger', 'success', 'primary', 'dark' ];

    return (
        <div className="profile-details ps-md-5 ps-3 text-start">
            
            <div className="profile-name">
                <strong className="fs-2 align-middle">{ data.name }</strong>
            </div>

            <div className="profile-location">
                <strong className="fs-6 text-muted">
                    { (data.location.city && data.location.city.length > 0) ? data.location.city : "City" }
                    <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                    { (data.location.state && data.location.state.length > 0) ? data.location.state : "State" }
                    <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                    { (data.location.country && data.location.country.length > 0) ? data.location.country : "Country" }
                </strong>
            </div>

            <div className="profile-desc text-muted pe-2">
                { (data.description && data.description.length > 0) ? data.description : "Your description lives here" }
            </div>

            <div className="friend-avatars mt-2">
                {   (data.friends && data.friends.length > 0) &&
                    data.friends.map(friend => (
                        <Avatar name={friend} scale="sm" theme={themes[Math.floor(Math.random() * themes.length)]} key={friend}/>
                    )) && <span><i className="fas fa-plus text-muted pt-1 align-middle ms-2"></i></span>
                }
            </div>
            
        </div>
    );
}
 
export default Details;