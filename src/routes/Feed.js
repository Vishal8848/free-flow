import { Link } from 'react-router-dom'
import CreatePost from '../components/CreatePost'
import Trending from '../components/Trending'
import Updates from '../components/Updates'
import Chat from '../components/Chat'
import Post from '../components/Post'

const Feed = () => {
    return ( 
        <div className="container-fluid feed row gx-0 gx-md-4 gy-3 gy-md-2 m-auto justify-content-center">
            <div className="col-md-3 mb-2">
                <div className="feed-chat">
                    <Chat/>
                </div>
                <div className="feed-actions mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Actions</span>
                    <div className="action-set border py-3">
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-user me-2 text-primary"></i> Profile</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-heart me-2 text-danger"></i> Posts</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-bookmark me-2 text-success"></i> Saved</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-edit me-2 text-dark"></i> Settings</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-lightbulb me-2 text-warning"></i> Feedback</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-5 mb-2">
                <div className="feed-create border">
                    <CreatePost/>
                </div>
                <div className="feed-post mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Posts</span>
                    <div className="posts-set">
                        <Post/><br/>
                        <Post/>
                    </div>
                </div>
            </div>
            <div className="col-md-3 mb-2">
                <div className="feed-updates">
                    <span className="feed-title ps-3 text-muted fw-bold">Updates</span>
                    <Updates />
                </div>
                <div className="feed-trending mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Trending</span>
                    <Trending />
                </div>
            </div>
        </div>
    );
}
 
export default Feed;