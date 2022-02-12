import { useState } from 'react'
import { Avatar, parseTime } from '../Extras'

const PostCard = ({ user, data, save = false }) => {

    // Usage: for saved posts of other users
    const [ saved, setSaved ] = useState(true);

    console.log(user, data, save)

    const { date } = parseTime(data.createdAt)

    return ( 
        <div className="postcard m-md-3 mt-3 theme-outer">
            <div className="postcard-header px-3 py-2 theme-inner">
                <Avatar name={user.name} scale="md" theme={user.theme}/>
                <div className="postcard-setter ps-3">
                    <div className="fs-5 fw-bold">
                        { user.name }
                    </div>
                    <div className="postcard-time text-muted">
                        { date }
                    </div>
                </div>
                <div className={`postcard-actions ${ save ? "" : "dropdown" }`}>
                    {   save ?
                        <i className={`fas fa-bookmark text-success fa-lg ${ saved ? "fw-bold" : "fw-normal" }`} onClick={() => setSaved(!saved)}></i> : <>
                        <button className="btn theme-inner border-0 rounded-circle py-2 px-3" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v fa-lg"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end theme-inner shadow" style={{ color: "inherit" }}>
                            <li className="dropdown-item theme-inner">
                                <i className="fas fa-trash-alt fa-lg me-2 text-danger"></i>Delete
                            </li>
                        </ul></>
                    }
                </div>
            </div>
            <div className="postcard-body theme-inner">
                {  false && data.URL && <div className="image bg-dark" style={{ background: `url(${data.URL}) center center / cover no-repeat` }}></div> }
                <div className="content text-muted">
                    { [data.content.substring(0, 50), ' ...' ] }
                </div>
            </div>
            <div className="postcard-status p-3 text-danger theme-inner">
                <i className="fas fa-heart me-2"></i> <strong>{ data.totalLikes } Likes</strong>
            </div>
        </div>
    );
}
 
export default PostCard;