import Avatar from '../Avatar'
import { parseTime } from '../Timestamp';

const Comment = ({ line }) => {

    const { date, time }  = parseTime(Date.now())

    return ( 
        <div className={`comment ${ line ? 'border-bottom' : '' }`}>
            
            <div className="comment-header px-2 py-1">
            
                <div className="comment-creator">
                    <Avatar name="Vishal Pranav" scale='sm' theme='primary'/>
                    <div className="creator fw-bold ps-2">
                        Vishal Pranav
                    </div>
                </div>
            
                <div className="comment-timestamp text-muted">
                    { time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { date }
                </div>
            
            </div>
            
            <div className="comment-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis minima necessitatibus accusantium quis, debitis eum.
            </div>
        
        </div>
    );
}
 
export default Comment;