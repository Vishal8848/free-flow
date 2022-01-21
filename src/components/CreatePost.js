import Avatar from "./Avatar";

const CreatePost = () => {
    return (<>
        <div className="create-post-trigger border py-1 mb-2 px-2">
            <Avatar name="Vishal Pranav" scale="md" theme="dark"/>
            <div className="w-75 fs-5 fw-bold">Create New Post</div>
            <i className="fas fa-paper-plane fa-lg me-3"></i>
        </div>
        <div className="create-post border py-1 mb-2 px-2">
            <Avatar name="Vishal Pranav" scale="md" theme="primary"/>
            <div className="w-75 fs-5 fw-bold">Create New Post</div>
            <i className="fas fa-times fa-lg text-danger"></i>
            <form className="create-form">

            </form>
        </div>
    </> );
}
 
export default CreatePost;