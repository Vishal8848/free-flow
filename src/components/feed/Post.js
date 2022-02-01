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

const Post = () => {

    const { date, time } = parseTime(164266299431223);

    return ( 
        <div className="post theme-middle rounded rounded-3">
            
            <div className="post-header px-3 px-md-4 py-2 py-md-3 theme-middle">
            
                <div className="post-creator">
                    <Avatar name="Vishal Pranav" scale='md' theme='danger'/>
                    <div className="creator fs-5 ps-3">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="post-timestamp text-muted">
                    { time } <i className="fas fa-circle align-middle px-1" style={{ fontSize: "5px" }}></i> { date }
                </div>
            
            </div>
            
            <div className="post-body">
                <div className="content theme-inner text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates esse nihil impedit at perspiciatis temporibus dolor dicta dolorem ut, aliquam suscipit quis labore expedita molestias quia doloremque neque exercitationem nostrum? Deleniti quis illo, quos ipsa ea maiores saepe. Incidunt recusandae enim pariatur a assumenda impedit debitis sapiente dolorum ullam voluptatibus?
                </div>
                <div className="image bg-dark"></div>
            </div>
            
            <div className="post-actions">
                <div className="py-3 px-2 text-center theme-middle text-danger"><i className="fas fa-heart fa-lg me-2"></i> <strong>234</strong> Likes</div>
                <div className="py-3 px-2 text-center theme-middle text-success"><i className="fas fa-bookmark fa-lg me-2"></i> Save </div>
                <div className="py-3 px-2 text-center theme-middle text-primary"><i className="fas fa-share-square fa-lg me-2"></i> Share</div>
            </div>
            
            <div className="post-comments theme-inner">
                <Comment/>
                <Comment/>
            </div>
            
            <div className="post-create-comment theme-middle px-2 px-md-4 py-3">
                <Avatar name="Vishal Pranav" scale='md' theme='success'/>
                <input className="w-75 theme-middle" placeholder="Add your comment"/>
                <div className="submit-comment"><i className="fas fa-paper-plane fa-lg"></i></div>
            </div>
        
        </div>
    );
}
 
export default Post;