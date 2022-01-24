import Avatar from '../Avatar'

const Friend = () => {
    return ( 
        <div className="friend border">
            <div className="friend-img">
                <Avatar name="Vishal Pranav" scale="square" theme="danger"/>
            </div>
            <div className="friend-desc ps-3 border">
                <span className="fs-5 fw-bold">Vishal Pranav</span><br/>
                <span className="fs-6 fst-italic text-muted">2 mutual friends</span>
            </div>
            <div className="friend-actions border">
                <button className="btn rounded-circle py-2 px-3">
                    <i className="fas fa-ellipsis-v fa-lg"></i>
                </button>
            </div>
        </div>
    );
}
 
export default Friend;