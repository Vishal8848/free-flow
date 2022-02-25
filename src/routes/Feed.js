// Default
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Firebase
import { firebaseAllPosts } from '../firebase/firebaseStore'

// Imports
import CreatePost from '../components/feed/CreatePost'
import Trending from '../components/feed/Trending'
import { AuthContext, UserContext } from '../App'
import Updates from '../components/feed/Updates'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import feedImage from '../assets/posts.png'
import Chat from '../components/feed/Chat'
import Post from '../components/feed/Post'
import useWindow from '../hooks/useWindow'

const Feed = () => {

    // Authorize auth or Redirect
    const setRoute = useNavigate();
    const { auth } = useContext(AuthContext);
    useEffect(() => { if(!auth.status) setRoute('/') }, [auth, setRoute]);

    // Use UserContext
    const { user } = useContext(UserContext);
    const [ posts, setPosts ] = useState(null);

    // Stats Values
    const [ chatCount, setChatCount ] = useState(<i className="fas fa-wifi fs-4"></i> );
    const [ postCount, setPostCount ] = useState(<i className="fas fa-wifi fs-4"></i> );
    const [ userCount, setUserCount ] = useState(<i className="fas fa-wifi fs-4"></i> );
    const [ commentCount, setCommentCount ] = useState(<i className="fas fa-wifi fs-4"></i> );

    // Fetch Posts
    useEffect(() => {
        firebaseAllPosts(user && user.friends).then(res => {
            if(!res.error)  {
                setPosts(res.data)
                setPostCount(res.data.length)
                let count = 0;
                for(const post of res.data) count += post.comments.length
                setCommentCount(count)
            }
        })
    }, [user])

    // Adapt to Window Size
    const { width } = useWindow();
    const [ params ] = useSearchParams();
    const type = params.get('type');
    const [ feed, setFeed ] = useState({ 
        restrict: width <= 768 ? true : false, 
        state: type === 'chat' ? 1 : type === 'trend' ? 2 : 0 
    });

    // Listen to Window Resize
    useEffect(() => {
        if(width <= 768 && !feed.restrict) setFeed({ restrict: true, state: 0 })
        if(width  > 768 && feed.restrict) setFeed({ restrict: false, state: 0 })
    }, [width, feed.restrict]);

    // Update Feed
    useEffect(() => {
        if(feed.restrict) 
            setFeed({ 
                restrict: true, 
                state: params.get('type') === 'chat' ? 1 : params.get('type') === 'trend' ? 2 : 0 
            })
        else setFeed({ restrict: false, state: 0 });
    }, [params, feed.restrict]);
    
    return ( user && <>
        <Header setUserCount={setUserCount}/>
        <div className="container-fluid feed row gx-0 gx-md-4 m-auto justify-content-center theme-outer">
            
            {   auth.data && ((!feed.restrict && feed.state === 0) || (feed.restrict && feed.state === 1)) &&
                <div className="col-md-3 mt-md-3">
                    
                    <div className="feed-chat">
                        <Chat user={{
                            name: user.fname + ' ' + user.lname,
                            uid: auth.data.uid,
                            theme: user.theme,
                            dp: user.dp
                        }} setChatCount={setChatCount}/>
                    </div>
                    
                    {   !feed.restrict &&
                        <div className="feed-stats mt-3 animate__animated animate__slideInLeft">
                            <div className="stat-set mb-3">
                                <div className="stat theme-middle py-2 me-2 shadow" style={{ borderRadius: "10px" }}>
                                    <h1 id='user-count'>{ userCount }</h1>
                                    <span className="feed-title ps-3 text-muted fw-bold">Users</span>
                                </div>
                                <div className="stat theme-middle py-2 ms-2 shadow" style={{ borderRadius: "10px" }}>
                                    <h1 id='chat-count'>{ chatCount }</h1>
                                    <span className="feed-title ps-3 text-muted fw-bold">Ripples</span>
                                </div>
                            </div>
                            <div className="stat-set mt-3">
                                <div className="stat theme-middle py-2 me-2 shadow" style={{ borderRadius: "10px" }}>
                                    <h1 id='post-count'>{ postCount }</h1>
                                    <span className="feed-title ps-3 text-muted fw-bold">Waves</span>
                                </div>
                                <div className="stat theme-middle py-2 ms-2 shadow" style={{ borderRadius: "10px" }}>
                                    <h1 id='comment-count'>{ commentCount }</h1>
                                    <span className="feed-title ps-3 text-muted fw-bold">Wavelets</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }

            {   auth.data && (!feed.restrict || (feed.restrict && feed.state === 0)) &&
                <div className="col-md-6 mt-md-3">

                    <div className="feed-create">
                        <CreatePost width={width} user={{
                            name: user.fname + ' ' + user.lname,
                            uid: auth.data.uid,
                            theme: user.theme,
                            dp: user.dp
                        }}/>
                    </div>

                    <div className="feed-post mt-3">
                        <div className="posts-set animate__animated animate__slideInUp">
                        {   posts ? posts.sort((x, y) => parseInt(y.createdAt) - parseInt(x.createdAt)).map(post => (
                                <Post user={{
                                    name: user.fname + ' ' + user.lname,
                                    uid: auth.data.uid,
                                    theme: user.theme,
                                    dp: user.dp
                                }} data={post} key={post.pid}/>
                            )) :
                            <div className="notice text-muted px-5" style={{ borderRadius: "10px", height: "75vh" }}>
                                { feedImage && <img src={feedImage} alt="Feed" width="150px" height="150px" style={{ marginBottom: "50px" }}/> }
                                <br/><strong>The Shore</strong><br/>
                                Chronologically ordered collection of waves
                            </div>
                        }
                        </div>
                    </div>

                </div>
            }

            {   auth.data && ((!feed.restrict && feed.state === 0) || (feed.restrict && feed.state === 2)) &&
                <div className="col-md-3 mt-md-3">

                    <div className="feed-updates">
                        <Updates user={{
                            name: user.fname + ' ' + user.lname,
                            friends: user.friends,
                            uid: auth.data.uid,
                            theme: user.theme,
                            dp: user.dp
                        }}/>
                    </div>

                    <div className="feed-trending mt-3">
                        <Trending />
                    </div>
                    
                </div>
            }

        </div>
        <Footer changeFeed={setFeed}/>
    </>);
}
 
export default Feed;