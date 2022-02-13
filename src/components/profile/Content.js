import { Avatar } from "../Extras";

const Content = ({ data }) => {

    const themes = [ 'danger', 'success', 'primary', 'dark' ];

    return (<>
        <div className="profile-stats fw-bold">
            <div className="friend-stats px-3 px-md-4 text-center">
                <div className="fs-5">{ data.friends.length }</div>
                <div className="text-muted">Friends</div>
            </div>
            <div className="post-stats px-3 px-md-4 text-center border-top">
                <div className="fs-5">{ data.posts }</div>
                <div className="text-muted">Posts</div>
            </div>
            <div className="likes-stats px-3 px-md-4 text-center border-top">
                <div className="fs-5">{ data.likes }</div>
                <div className="text-muted">Likes</div>
            </div>
        </div>

        <div className="profile-details ps-md-5 ps-3 text-start">
            
            <div className="profile-name">
                <strong className="fs-2 align-middle">{ data.name }</strong>
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
    </>);
}
 
export default Content;