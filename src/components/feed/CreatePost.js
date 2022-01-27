import Avatar from "../Avatar";
import { useState } from "react";

const CreatePost = () => {

    const [ image, setImg ] = useState({ imageURL: '', status: false });
    const [ form, openForm ] = useState(false);

    const previewImg = (e) => {
        const data = {
            imageURL: URL.createObjectURL(e.target.files[0]),
            status: true
        };   
        setImg({...data})
    }

    const createPost = () => {
        document.createPost.reset();
        setImg({ imageURL: '', status: false });
    }

    return (<>
        <div className="post-trigger p-2 border-bottom" style={{ borderBottomLeftRadius: `${ form ? "0" : "10px" }`, borderBottomRightRadius: `${ form ? "0" : "10px" }` }}>
            <Avatar name="Vishal Pranav" scale="md" theme="primary"/>
            <div className="w-75 fs-6 px-3 py-2 rounded-pill border text-muted" onClick={() => form ? openForm(false) : openForm(true)}>Create New Post</div>
            <i className="fas fa-paper-plane text-primary fa-lg me-3" onClick={() => createPost()}></i>
        </div>
        <form name="createPost" className="create-form p-3" style={{ display: `${ form ? 'block' : 'none' }` }}>
            <div className="d-flex align-middle justify-content-start">
                <label htmlFor="post-visibility" style={{ width: "150px" }} className="pt-3 text-muted text-center">Post Visibility</label>
                <select id="post-visibility" className="form-select text-muted" style={{ width: "fit-content", height: "50px" }}>
                    <option value="public">Anyone on Freeflow</option>
                    <option value="private">Friends Only</option>
                </select>
            </div>
            <div className="form-floating mt-3">
                <input id="post-title" type="text" className="form-control" placeholder="Post Title (optional)"/>
                <label htmlFor="post-title" className="text-muted">Post Title <small> - optional</small></label>
            </div>
            <div className="form-floating mt-3">
                <textarea id="post-content" maxLength="1000" className="form-control" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px" }}></textarea>
                <label htmlFor="post-content" className="text-muted">Write down your thoughts ...</label>
            </div>
            {   image.status &&
                <div className="image-preview mt-3 text-muted">
                    &nbsp;&nbsp;Preview Image
                    <img src={image.imageURL} style={{ width: "100%", height: "300px", borderRadius: "10px" }} className="mt-2 border" alt="" />
                </div>
            }
            <div className="mt-3">
                <label htmlFor="post-image" className="text-muted mb-2">&nbsp;&nbsp;{ image.status ? "Image Uploaded" : "Upload Image" }</label>
                <input id="post-image" className="form-control" onChange={(e) => previewImg(e)} type="file" accept="image/*"/>
            </div>
        </form>
    </>);
}
 
export default CreatePost;