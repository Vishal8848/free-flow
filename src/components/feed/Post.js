import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, parseTime } from '../Extras'
import { firebasePostReaction, firebaseAddComment, firebaseUpdate } from '../../firebase/firebaseStore'

const Comment = ({ data }) => {

    // Parsed Time Values
    const { date, time, status }  = parseTime(data.commentedAt)

    return ( 
        <div className="comment">
            
            <div className="comment-header px-2 py-1">
            
                <Link to={`/profile/${data.commenter}`}>
                    <div className="comment-creator">
                        <Avatar image={data.dp} name={data.name} scale='sm' theme={data.theme}/>
                        <div className="creator ps-2">
                            {data.name}
                        </div>
                    </div>
                </Link>
            
                <div className="comment-timestamp text-muted">
                    { time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { status !== "" ? status : date }
                </div>
            
            </div>
            
            <div className="comment-body text-muted">
                { data.comment }
            </div>
        
        </div>
    );
}

const Post = ({ user, data }) => {

    // Likes and Saves Handler
    const liked = data.likes.some(like => like === user.uid), saved = data.saved.some(save => save === user.uid);
    const [ like, setLike ] = useState(liked), [ save, setSave ] = useState(saved);

    // Comments Handler
    const commentInitial = { commenter: user.uid, name: user.name, dp: user.dp, comment: "", commentedAt: null };
    let [ newComment, setNewComment ] = useState(commentInitial);
    let [ comments, setComments ] = useState(data.comments);

    // Parsed Time Values
    const { date, time, status } = parseTime(data.createdAt)

    const addNewComment = () => {

        if(newComment.comment.length > 0)  {
            newComment.commentedAt = Date.now().toString();
            firebaseAddComment(data.pid, newComment)
            firebaseUpdate(user.uid, 'comment')
            setComments([...comments, newComment])
            setNewComment(commentInitial);
        }
    }

    useEffect(() => {
        const commentInput = document.getElementById('new-comment-' + data.pid)
        const triggerComment = (e) => {
            if(e.keyCode === 13 && e.target.value.length > 0)  addNewComment()
        }

        commentInput.addEventListener('keyup', triggerComment);
        return () => commentInput.removeEventListener('keyup', triggerComment)
    
    })

    const handleReaction = (type) => {

        if(type === 'like') {
            firebasePostReaction(data.pid, user.uid, type, !like ? 'add' : 'remove')
            setLike(!like)
        }   else {
            firebasePostReaction(data.pid, user.uid, type, !save ? 'add' : 'remove')
            setSave(!save)
        }
    }

    return ( data &&
        <div className="post theme-middle rounded rounded-3 mb-3 shadow">
            
            <div className="post-header px-3 px-md-4 py-2 py-md-3 theme-middle">
            
                <Link to={`/profile/${data.creator}`}>
                    <div className="post-creator">
                        <Avatar image={data.dp} name={data.name} scale='md' theme={data.theme}/>
                        <div className="creator fs-5 ps-3">
                            { data.name }
                        </div>
                    </div>
                </Link>
            
                <div className="post-timestamp text-muted">
                    { time } <i className="fas fa-circle align-middle px-1" style={{ fontSize: "5px" }}></i> { status !== "" ? status : date }
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
                    <strong>{ liked ? (!like ? data.likes.length - 1 : data.likes.length > 0 && data.likes.length) : (like ? data.likes.length + 1 : data.likes.length > 0 && data.likes.length) }</strong>
                    &nbsp; Like{ like ? 'd' : data.likes.length > 1 ? 's' : '' }
                </div>
                <div className="py-3 px-2 text-center theme-middle text-success" onClick={() => handleReaction('save')}>
                    <i className="fas fa-bookmark fa-lg me-2" style={{ fontWeight: save ? 'unset' : 'normal' }}></i>
                    <strong>{ saved ? (!save ? data.saved.length - 1 : data.saved.length > 0 && data.saved.length) : (save ? data.saved.length + 1 : data.saved.length > 0 && data.saved.length) }</strong>
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
                        <Comment data={comment} key={comment.commentedAt}/>
                    ))
                }
            </div>  }
            
            <div className="post-create-comment theme-middle px-2 px-md-4 py-3">
                <Link to={`/profile/${user.uid}`}>
                    <Avatar image={user.dp} name={user.name} scale='md' theme={user.theme}/>
                </Link>
                <input id={`new-comment-${data.pid}`} className="w-75 theme-middle" placeholder="Add your comment"
                    value={newComment.comment} onChange={(e) => { newComment.comment = e.target.value; setNewComment({...newComment}) }}/>
                <div className="submit-comment" onClick={() => addNewComment()} style={{ cursor: "pointer" }}>
                    <i className="fas fa-paper-plane fa-lg"></i>
                </div>
            </div>
        
        </div>
    );
}
 
export default Post;