import { Link } from 'react-router-dom';
import Post from '../components/Post'
import Trending from '../components/Trending';
import CreatePost from '../components/CreatePost';

const Feed = () => {
    return ( 
        <div className="container-fluid row gx-0 gx-md-4 gy-3 gy-md-2 m-auto justify-content-center border border-2 rounded">
            <div className="col-md-3">
                <div className="feed-trending border shadow">
                    <Trending />
                </div>
                <div className="feed-actions border mt-3 py-3 shadow">
                    <Link to="/profile" className="action">
                        <i className="fas fa-user me-2 text-success"></i> Profile
                    </Link><hr/>
                    <Link to="/profile" className="action">
                        <i className="fas fa-star me-2 text-primary"></i> Posts
                    </Link><hr/>
                    <Link to="/profile" className="action">
                        <i className="fas fa-heart me-2 text-danger"></i> Archives
                    </Link><hr/>
                    <Link to="/profile" className="action">
                        <i className="fas fa-edit me-2 text-dark"></i> Settings
                    </Link><hr/>
                    <Link to="/profile" className="action">
                        <i className="fas fa-envelope me-2 text-warning"></i> Feedback
                    </Link>
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
                <div className="feed-updates">

                </div>
                <div className="feed-ad">

                </div>
            </div>
        </div>
    );
}
 
export default Feed;