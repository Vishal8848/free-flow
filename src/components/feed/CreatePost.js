import { Avatar } from "../Extras";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { firebaseUploadImage } from '../../firebase/firebaseBulk'
import { firebaseCreatePost } from "../../firebase/firebaseStore"

const CreatePost = ({ width, user }) => {

    const initial = { uid: user.uid, private: "public", title: "", content: "", hasImage: false }
    const [ post, setPost ] = useState(initial);
    const [ image, setImg ] = useState({ URL: '', blob: null, status: false });
    const [ form, openForm ] = useState(false);

    const submitPost = () => {
        if(post.content.length > 0) {
            firebaseCreatePost(post).then(res => {
                if(!res.error && post.hasImage)   
                    firebaseUploadImage(res.data, image.blob, 'posts').then(() => {
                        console.log("Post Image Uploaded")
                    })
                console.log("Post Created Successfully")
                setPost(initial)
                openForm(false)
            })
        }   else console.log("Post Content is Required")
    }

    const updateField = (key, value) => {
        let fields = post;
        fields[key] = value;
        setPost({...fields})
    }

    const previewImg = (e) => {
        const data = {
            URL: URL.createObjectURL(e.target.files[0]),
            blob: e.target.files[0],
            status: true
        };   
        setImg({...data})
    }

    useEffect(() => {
        updateField('hasImage', image.status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    return (<>
        <div className="post-trigger p-2 theme-middle" style={{ borderBottomLeftRadius: `${ form ? "0" : "10px" }`, borderBottomRightRadius: `${ form ? "0" : "10px" }` }}>
            { width > 768 && 
                <Link to={`/profile/${user.uid}`}>
                    <Avatar image={user.dp} name={user.name} scale="md" theme={user.theme}/>
                </Link>
            }
            <div className="w-100 fs-6 px-3 py-2 ms-md-3 rounded-pill border-dark theme-inner text-muted" onClick={() => form ? openForm(false) : openForm(true)}>Create New Wave</div>
            <div className="vr mx-3"></div>
            <i className="fas fa-paper-plane text-primary fa-lg me-3" onClick={() => submitPost()}></i>
        </div>
        <form className="create-form theme-middle p-3" style={{ display: `${ form ? 'block' : 'none' }` }}>
            <div className="d-flex align-middle justify-content-start">
                <label htmlFor="post-visibility" style={{ width: "150px" }} className="pt-3 text-muted text-center">Visibility</label>
                <select id="post-visibility" className="form-select me-2 text-muted border-0 theme-inner" style={{ width: "fit-content" }}
                    value={post.private} onChange={(e) => updateField('private', e.target.value)}>
                    <option value="public">Anyone on Freeflow</option>
                    <option value="private">Friends Only</option>
                </select>
                <div className="form-floating ms-2 theme-inner rounded rounded-3" style={{ width: "100%" }}>
                    <input id="post-title" type="text" className="form-control border-0" placeholder="Wave Title (optional)"
                        value={post.title} onChange={(e) => updateField('title', e.target.value)}/>
                    <label htmlFor="post-title" className="text-muted">Wave Title <small> - optional</small></label>
                </div>
            </div>
            <div className="form-floating mt-3 theme-inner rounded rounded-3">
                <textarea id="post-content" maxLength="1000" className="form-control border-0" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px" }}
                    value={post.content} onChange={(e) => updateField('content', e.target.value)}></textarea>
                <label htmlFor="post-content" className="text-muted">Describe your wave</label>
            </div>
            {   image.status &&
                <div className="image-preview mt-3 text-muted">
                    &nbsp;&nbsp;Preview Picture
                    <img src={image.URL} style={{ width: "100%", height: "300px", borderRadius: "10px" }} className="mt-2" alt="" />
                </div>
            }
            <div className="mt-3">
                <label htmlFor="post-image" className="text-muted mb-2">&nbsp;&nbsp;{ image.status ? "Picture Uploaded" : "Upload Picture" }</label>
                <div className="theme-inner rounded rounded-3">
                    <input id="post-image" className="form-control border-0" onChange={(e) => previewImg(e)} type="file" accept="image/*"/>
                </div>
            </div>
        </form>
    </>);
}
 
export default CreatePost;