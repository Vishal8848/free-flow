import Avatar from './Avatar';
import Comment from './Comment'

const Post = () => {
    return ( 
        <div className="post border shadow">
            
            <div className="post-header px-4 py-3 border-bottom">
            
                <div className="post-creator">
                    <Avatar name="Vishal Pranav" scale='md' theme='danger'/>
                    <div className="fs-5 fw-bold ps-3">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="text-muted">
                    08:34 PM <i className="fas fa-circle align-middle px-1" style={{ fontSize: "5px" }}></i> 12 Mar 2021
                </div>
            
            </div>
            
            <div className="post-body border-bottom">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti perferendis, explicabo omnis possimus sapiente perspiciatis saepe itaque expedita doloribus inventore debitis magnam molestiae dignissimos delectus officia reprehenderit? Error commodi, earum impedit veniam totam incidunt culpa corrupti. Culpa nihil magni rem odio et nobis. Nobis quae laudantium consectetur quos hic perspiciatis.
            </div>
            
            <div className="post-actions border-bottom">
                <div className="py-3 px-2 text-center text-primary"><i className="far fa-thumbs-up fa-lg me-2"></i> <strong>234</strong> Likes</div>
                <div className="py-3 px-2 text-center text-danger"><i className="far fa-heart fa-lg me-2"></i> Save </div>
                <div className="py-3 px-2 text-center text-success"><i className="fas fa-share-alt fa-lg me-2"></i> Share</div>
            </div>
            
            <div className="post-comments">
                <Comment line={true}/>
                <Comment />
            </div>
            
            <div className="post-create-comment border-top px-4 py-3">
                <Avatar name="Vishal Pranav" scale='md' theme='success'/>
                <input className="mx-3 ps-2" placeholder="Add your comment"/>
                <div className="submit-comment"><i className="fas fa-paper-plane fa-lg"></i></div>
            </div>
        
        </div>
    );
}
 
export default Post;