import Avatar from './Avatar'

const Comment = ({ line }) => {
    return ( 
        <div className={`comment ${ line ? 'border-bottom' : '' }`}>
            
            <div className="comment-header px-2 py-1">
            
                <div className="comment-creator">
                    <Avatar name="Vishal Pranav" scale='sm' theme='primary'/>
                    <div className="fs-6 fw-bold ps-2">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="text-muted">
                    08:50 PM <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> 13 Mar 2021
                </div>
            
            </div>
            
            <div className="comment-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima necessitatibus accusantium quis, debitis eum.
            </div>
        
        </div>
    );
}
 
export default Comment;