const Stats = ({ data }) => {
    return ( 
        <div className="profile-stats fw-bold">
            <div className="friend-stats px-3 px-md-4 text-center">
                <div className="fs-5">{ data.friends }</div>
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
    );
}
 
export default Stats;