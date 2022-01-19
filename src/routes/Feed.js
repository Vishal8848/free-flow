import Post from '../components/Post'

const Feed = () => {
    return ( 
        <div className="container-fluid">
            <div className="row g-0 border border-2 rounded">
                <div className="col-md-3">
                    <div className="feed-profile">

                    </div>
                    <div className="feed-ad">

                    </div>
                    <div className="feed-actions">

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="feed-create">

                    </div>
                    <div className="feed-post">
                        <Post/><br/>
                        <Post/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="feed-trending">

                    </div>
                    <div className="feed-ad">

                    </div>
                    <div className="feed-updates">

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Feed;