import { Link } from 'react-router-dom';
import Post from '../components/Post'
import Trending from '../components/Trending';
import CreatePost from '../components/CreatePost';
import Chat from '../components/Chat';
import Updates from '../components/Updates';

const Feed = () => {
    return ( 
        <div className="container-fluid row gx-0 gx-md-4 gy-3 gy-md-2 m-auto justify-content-center border border-2 rounded">
            <div className="col-md-3">
                <div className="feed-chat border shadow">
                    <Chat/>
                </div>            
                <div className="feed-ad">

                </div>
                <div className="feed-actions border mt-3 py-3 shadow">
                    <div className="action">
                        <Link to="/profile"><i className="fas fa-user me-2 text-success"></i> Profile</Link>
                    </div><hr/>
                    <div className="action">
                        <Link to="/profile"><i className="fas fa-star me-2 text-primary"></i> Posts</Link>
                    </div><hr/>
                    <div className="action">
                        <Link to="/profile"><i className="fas fa-heart me-2 text-danger"></i> Saved</Link>
                    </div><hr/>
                    <div className="action">
                        <Link to="/profile"><i className="fas fa-edit me-2 text-dark"></i> Settings</Link>
                    </div><hr/>
                    <div className="action">
                        <Link to="/profile"><i className="fas fa-lightbulb me-2 text-warning"></i> Feedback</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <div className="feed-create">
                    <CreatePost/>
                </div>
                <div className="feed-post">
                    <Post/><br/>
                    <Post/>
                </div>
            </div>
            <div className="col-md-3">
                <div className="feed-trending border shadow">
                    <Trending />
                </div>
                <div className="feed-ad">

                </div>
                <div className="feed-updates mt-3">
                    <Updates />
                </div>
            </div>
        </div>
    );
}
 
export default Feed;