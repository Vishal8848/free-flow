import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CreatePost from '../components/feed/CreatePost'
import Trending from '../components/feed/Trending'
import Updates from '../components/feed/Updates'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chat from '../components/feed/Chat'
import Post from '../components/feed/Post'
import useWindow from '../hooks/useWindow'

const Feed = () => {

    const { width } = useWindow();
    const [ params ] = useSearchParams();
    const type = params.get('type');
    const [ feed, setFeed ] = useState({ 
        restrict: width <= 768 ? true : false, 
        state: type === 'chat' ? 1 : type === 'trend' ? 2 : 0 
    });

    useEffect(() => {
        if(width <= 768 && !feed.restrict) setFeed({ restrict: true, state: 0 })
        if(width  > 768 && feed.restrict) setFeed({ restrict: false, state: 0 })
    }, [width, feed.restrict]);

    useEffect(() => {
        if(feed.restrict) 
            setFeed({ 
                restrict: true, 
                state: params.get('type') === 'chat' ? 1 : params.get('type') === 'trend' ? 2 : 0 
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    
    return ( <>
        <Header />
        <div className="container-md feed row gx-0 gx-md-4 m-auto justify-content-center theme-dark-outer">
            
            {   ((!feed.restrict && feed.state === 0) || (feed.restrict && feed.state === 1)) &&
                <div className="col-md-3 mb-md-2">
                    
                    <div className="feed-chat">
                        <Chat/>
                    </div>
                    
                    {   !feed.restrict &&
                        <div className="feed-actions mt-3">
                            <span className="feed-title ps-3 text-muted fw-bold">Actions</span>
                            <div className="action-set theme-dark-middle">
                                <div className="action theme-dark-inner">
                                    <Link to="/profile" className="text-light"><i className="fas fa-user mx-3 text-light"></i> Profile</Link>
                                </div>
                                <div className="action theme-dark-inner">
                                    <Link to="/profile?type=posts" className="text-light"><i className="fas fa-paper-plane mx-3 text-light"></i> Posts</Link>
                                </div>
                                <div className="action theme-dark-inner">
                                    <Link to="/profile?type=friends" className="text-light"><i className="fas fa-heart mx-3 text-light"></i> Friends</Link>
                                </div>
                                <div className="action theme-dark-inner">
                                    <Link to="/profile?type=saved" className="text-light"><i className="fas fa-bookmark mx-3 text-light"></i> Saved</Link>
                                </div>
                                <div className="action theme-dark-inner">
                                    <Link to="/contact" className="text-light"><i className="fas fa-lightbulb mx-3 text-light"></i> Feedback</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }

            {   (!feed.restrict || (feed.restrict && feed.state === 0)) &&
                <div className="col-md-6 mb-md-2">

                    <div className="feed-create border">
                        <CreatePost width={width}/>
                    </div>

                    <div className="feed-post mt-3">
                        <span className="feed-title ps-3 text-muted fw-bold">Posts</span>
                        <div className="posts-set">
                            <Post/><br/>
                            <Post/>
                        </div>
                    </div>

                </div>
            }

            {   ((!feed.restrict && feed.state === 0) || (feed.restrict && feed.state === 2)) &&
                <div className="col-md-3">

                    <div className="feed-updates">
                        <span className="feed-title ps-3 text-muted fw-bold">Updates</span>
                        <Updates />
                    </div>

                    <div className="feed-trending mt-3">
                        <span className="feed-title ps-3 text-muted fw-bold">Trending</span>
                        <Trending />
                    </div>
                    
                </div>
            }

        </div>
        <Footer changeFeed={setFeed}/>
    </>);
}
 
export default Feed;