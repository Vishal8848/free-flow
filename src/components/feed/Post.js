import { Avatar, parseTime } from '../Extras'

const Comment = () => {

    const { date, time }  = parseTime(Date.now())

    return ( 
        <div className="comment">
            
            <div className="comment-header px-2 py-1">
            
                <div className="comment-creator">
                    <Avatar name="Vishal Pranav" scale='sm' theme='primary'/>
                    <div className="creator ps-2">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="comment-timestamp text-muted">
                    { time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { date }
                </div>
            
            </div>
            
            <div className="comment-body text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima necessitatibus accusantium quis, debitis eum.
            </div>
        
        </div>
    );
}

const Post = ({ data }) => {

    const { date, time } = parseTime(data.createdAt)

    return ( 
        <div className="post theme-middle rounded rounded-3 mt-3">
            
            <div className="post-header px-3 px-md-4 py-2 py-md-3 theme-middle">
            
                <div className="post-creator">
                    <Avatar name={data.name} scale='md' theme={data.theme}/>
                    <div className="creator fs-5 ps-3">
                        { data.name }
                    </div>
                </div>
            
                <div className="post-timestamp text-muted">
                    { time } <i className="fas fa-circle align-middle px-1" style={{ fontSize: "5px" }}></i> { date }
                </div>
            
            </div>
            
            <div className="post-body">
                <div className="content theme-inner text-muted">
                    { data.content }
                </div>
                { data.URL && <div className="image bg-dark" style={{ background: `url(${data.URL}) center center / cover no-repeat` }}></div> }
            </div>
            
            <div className="post-actions">
                <div className="py-3 px-2 text-center theme-middle text-danger"><i className="fas fa-heart fa-lg me-2"></i> <strong>{ data.likes.length > 0 && data.likes.length }</strong> Like{ data.likes.length > 0 ? 's' : '' }</div>
                <div className="py-3 px-2 text-center theme-middle text-success"><i className="fas fa-bookmark fa-lg me-2"></i> <strong>{ data.saved.length > 0 && data.saved.length }</strong> Save{ data.saved.length > 0 ? 'd' : '' }</div>
                <div className="py-3 px-2 text-center theme-middle text-primary"><i className="fas fa-share-square fa-lg me-2"></i> Share</div>
            </div>
            
            { data.comments &&
            <div className="post-comments theme-inner">
                {   data.comments && data.comments.sort((x, y) => parseInt(x.commentedAt) - parseInt(y.commentedAt)).map(comment => (
                        <Comment data={comment} key={comment.commentor}/>
                    ))
                }
            </div>  }
            
            <div className="post-create-comment theme-middle px-2 px-md-4 py-3">
                <Avatar name={data.name} scale='md' theme={data.theme}/>
                <input className="w-75 theme-middle" placeholder="Add your comment"/>
                <div className="submit-comment"><i className="fas fa-paper-plane fa-lg"></i></div>
            </div>
        
        </div>
    );
}
 
export default Post;