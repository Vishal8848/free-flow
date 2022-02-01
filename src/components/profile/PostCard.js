import { useState } from 'react'
import { Avatar } from '../Extras'

const PostCard = ({ save = false }) => {

    // Usage: for saved posts of other users
    const [ saved, setSaved ] = useState(true);

    return ( 
        <div className="postcard m-md-3 mt-3 theme-outer">
            <div className="postcard-header px-3 py-2 theme-inner">
                <Avatar name="Vishal Pranav" scale="md" theme="success"/>
                <div className="postcard-setter ps-3">
                    <div className="fs-5 fw-bold">
                        Vishal Pranav
                    </div>
                    <div className="postcard-time text-muted">
                        20 Mar 2018
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
                <div className="image bg-dark"></div>
                <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ...
                </div>
            </div>
            <div className="postcard-status p-3 text-danger theme-inner">
                <i className="fas fa-heart me-2"></i> <strong>234 Likes</strong>
            </div>
        </div>
    );
}
 
export default PostCard;