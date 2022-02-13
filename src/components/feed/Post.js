import { useState } from 'react'
import { Avatar, parseTime } from '../Extras'
import { firebasePostReaction, firebaseAddComment } from '../../firebase/firebaseStore'

const Comment = ({ data }) => {

    const { date, time }  = parseTime(data.commentedAt)

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
                { data.comment }
            </div>
        
        </div>
    );
}

const Post = ({ user, data }) => {

    const [ like, setLike ] = useState(data.likes.some(like => like === user.uid));
    const [ save, setSave ] = useState(data.likes.some(save => save === user.uid));
    const commentInitial = { commenter: user.uid, comment: "", commentedAt: null };
    let [ newComment, setNewComment ] = useState(commentInitial);
    let [ comments, setComments ] = useState(data.comments);

    const addNewComment = () => {

        if(newComment.comment.length > 0)  {
            newComment.commentedAt = Date.now().toString();
            setNewComment({...newComment});
            firebaseAddComment(data.pid, newComment).then(res => setNewComment(commentInitial))
            comments.push(newComment)
            setComments([...comments])
        }

    }

    const handleReaction = (type) => {

        if(type === 'like') {
            firebasePostReaction(data.pid, user.uid, type, !like ? 'add' : 'remove')
            setLike(!like)
        }   else {
            firebasePostReaction(data.pid, user.uid, type, !save ? 'add' : 'remove')
            setSave(!save)
        }
    }

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
                <div className="py-3 px-2 text-center theme-middle text-danger" onClick={() => handleReaction('like')}>
                    <i className="fas fa-heart fa-lg me-2" style={{ fontWeight: like ? 'unset' : 'normal' }}></i>
                    <strong>{ data.likes.length > 0 && data.likes.length }</strong>
                    &nbsp; Like{ like ? 'd' : data.likes.length > 1 ? 's' : '' }
                </div>
                <div className="py-3 px-2 text-center theme-middle text-success" onClick={() => handleReaction('save')}>
                    <i className="fas fa-bookmark fa-lg me-2" style={{ fontWeight: save ? 'unset' : 'normal' }}></i>
                    <strong>{ data.saved.length > 0 && data.saved.length }</strong>
                    &nbsp; Save{ save ? 'd' : data.saved.length > 1 ? 's' : '' }
                </div>
                <div className="py-3 px-2 text-center theme-middle text-primary">
                    <i className="fas fa-share-square fa-lg me-2"></i> 
                    &nbsp; Share
                </div>
            </div>
            
            { comments &&
            <div className="post-comments theme-inner">
                {   comments && comments.sort((x, y) => parseInt(x.commentedAt) - parseInt(y.commentedAt)).map(comment => (
                        <Comment data={comment} key={comment.commentor}/>
                    ))
                }
            </div>  }
            
            <div className="post-create-comment theme-middle px-2 px-md-4 py-3">
                <Avatar name={data.name} scale='md' theme={data.theme}/>
                <input className="w-75 theme-middle" placeholder="Add your comment"
                    value={newComment.comment} onChange={(e) => { newComment.comment = e.target.value; setNewComment({...newComment}) }}/>
                <div className="submit-comment" onClick={() => addNewComment()} style={{ cursor: "pointer" }}>
                    <i className="fas fa-paper-plane fa-lg"></i>
                </div>
            </div>
        
        </div>
    );
}
 
export default Post;