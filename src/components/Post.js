import Avatar from './Avatar';
import Comment from './Comment'
import { parseTime } from './Timestamp'

const Post = () => {

    const { date, time } = parseTime(164266299431223);

    return ( 
        <div className="post border">
            
            <div className="post-header px-3 px-md-4 py-2 py-md-3 border-bottom">
            
                <div className="post-creator">
                    <Avatar name="Vishal Pranav" scale='md' theme='danger'/>
                    <div className="creator fs-5 fw-bold ps-3">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="post-timestamp text-muted">
                    { time } <i className="fas fa-circle align-middle px-1" style={{ fontSize: "5px" }}></i> { date }
                </div>
            
            </div>
            
            <div className="post-body border-bottom">
                <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates esse nihil impedit at perspiciatis temporibus dolor dicta dolorem ut, aliquam suscipit quis labore expedita molestias quia doloremque neque exercitationem nostrum? Deleniti quis illo, quos ipsa ea maiores saepe. Incidunt recusandae enim pariatur a assumenda impedit debitis sapiente dolorum ullam voluptatibus?
                </div>
                <div className="image bg-dark"></div>
            </div>
            
            <div className="post-actions border-bottom">
                <div className="py-3 px-2 text-center text-danger"><i className="fas fa-heart fa-lg me-2"></i> <strong>234</strong> Likes</div>
                <div className="py-3 px-2 text-center text-success"><i className="fas fa-bookmark fa-lg me-2"></i> Save </div>
                <div className="py-3 px-2 text-center text-primary"><i className="fas fa-share-square fa-lg me-2"></i> Share</div>
            </div>
            
            <div className="post-comments">
                <Comment line={true}/>
                <Comment />
            </div>
            
            <div className="post-create-comment border-top px-2 px-md-4 py-3">
                <Avatar name="Vishal Pranav" scale='md' theme='success'/>
                <input className="w-75" placeholder="Add your comment"/>
                <div className="submit-comment"><i className="fas fa-paper-plane fa-lg"></i></div>
            </div>
        
        </div>
    );
}
 
export default Post;