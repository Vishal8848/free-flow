import { Link } from 'react-router-dom'
import { Avatar, parseTime } from '../Extras'

const PostCard = ({ user, data, save = false }) => {

    const { date } = parseTime(data.createdAt)

    return ( 
        <div className="postcard m-md-3 mt-3 theme-outer">
            <div className="postcard-header px-3 py-2 theme-inner">
                {   save ?
                    <Link to={`/profile/${data.creator.split("").reverse().join("")}`}>
                        <Avatar image={user ? user.dp : data.dp} name={user ? user.name : data.name} scale="md" theme={user ? user.theme : data.theme}/>
                    </Link> :
                    <Avatar image={user ? user.dp : data.dp} name={user ? user.name : data.name} scale="md" theme={user ? user.theme : data.theme}/>
                }
                <div className="postcard-setter ps-3">
                    <div className="fs-5 fw-bold">
                        {   save ?
                            <Link to={`/profile/${data.creator.split("").reverse().join("")}`}>
                                { user ? user.name : data.name }
                            </Link> :
                            user ? user.name : data.name
                        }
                    </div>
                    <div className="postcard-time text-muted">
                        { date }
                    </div>
                </div>
            </div>
            <div className="postcard-body theme-inner">
                {  data.URL ? 
                    <div className="image bg-dark" style={{ background: `url(${data.URL}) center center / cover no-repeat` }}></div> :
                    <div className="text-center pt-5">
                        <i className="fas fa-camera fa-2x text-muted"></i><br/>
                        <span className="fs-6 text-muted">No image for this post</span>
                    </div>
                }
                <div className="content text-muted">
                    { [data.content.substring(0, 50), ' ...' ] }
                </div>
            </div>
            <div className="postcard-status p-3 text-danger theme-inner">
                <i className="fas fa-heart me-2"></i> <strong>{ data.totalLikes } Likes</strong>
            </div>
        </div>
    );
}
 
export default PostCard;