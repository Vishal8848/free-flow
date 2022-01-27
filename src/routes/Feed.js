import { Link } from 'react-router-dom'
import CreatePost from '../components/feed/CreatePost'
import Trending from '../components/feed/Trending'
import Updates from '../components/feed/Updates'
import Header from '../components/Header'
import Chat from '../components/feed/Chat'
import Post from '../components/feed/Post'

const Feed = () => {
    return ( <>
        <Header />
        <div className="container-md feed row gx-0 gx-md-4 gy-3 gy-md-2 m-auto justify-content-center">
            <div className="col-md-3 mb-2">
            
                {/* Live Chat */}
                <div className="feed-chat">
                    <Chat/>
                </div>

                {/* Feed Actions */}
                <div className="feed-actions mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Actions</span>
                    <div className="action-set border py-3">
                        <div className="action">
                            <Link to="/profile"><i className="fas fa-user me-2 text-dark"></i> Profile</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile/posts"><i className="fas fa-paper-plane me-2 text-primary"></i> Posts</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile/saved"><i className="fas fa-heart me-2 text-danger"></i> Friends</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/profile/friends"><i className="fas fa-bookmark me-2 text-success"></i> Saved</Link>
                        </div><hr/>
                        <div className="action">
                            <Link to="/contact"><i className="fas fa-lightbulb me-2 text-warning"></i> Feedback</Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-md-6 mb-2">

                {/* Create Post */}
                <div className="feed-create border">
                    <CreatePost/>
                </div>

                {/* Posts Feed */}
                <div className="feed-post mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Posts</span>
                    <div className="posts-set">
                        <Post/><br/>
                        <Post/>
                    </div>
                </div>

            </div>

            <div className="col-md-3 mb-2">

                {/* Updates */}
                <div className="feed-updates">
                    <span className="feed-title ps-3 text-muted fw-bold">Updates</span>
                    <Updates />
                </div>

                {/* Trending Post */}
                <div className="feed-trending mt-3">
                    <span className="feed-title ps-3 text-muted fw-bold">Trending</span>
                    <Trending />
                </div>
                
            </div>
        </div>
    </>);
}
 
export default Feed;