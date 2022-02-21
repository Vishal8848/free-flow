import { Avatar } from '../Extras'
import { Link } from 'react-router-dom';

const Friend = ({ data, side }) => {

    return ( 
        <div className={`friend p-2 rounded shadow-sm m${side}-md-auto mt-4 theme-inner`}>

            <div className="friend-img">
                <Link to={`/profile/${data.fid}`}>
                    <Avatar image={data.dp} name={data.name} scale="square" theme={data.theme}/>
                </Link>
            </div>

            <div className="friend-desc ps-3">
                <Link to={`/profile/${data.fid}`}>
                    <span className="fs-5 fw-bold">{ data.name }</span>
                </Link><br/>
                <span className="fs-6 fst-italic text-muted">2 mutual friends</span>
            </div>

            <div className="friend-actions dropdown theme-inner">
                <button className="btn rounded-circle theme-inner py-2 px-3 me-2" data-bs-toggle="dropdown">
                    <i className="fas fa-ellipsis-v fa-lg"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end theme-inner shadow" style={{ width: "fit-content" }}>
                    <div className="tint tint-tr"></div>
                    <li className="dropdown-item theme-inner">
                        <i className="fas fa-user fa-lg me-2"></i>View Profile
                    </li>
                    <li className="dropdown-item theme-inner">
                        <i className="fas fa-ban fa-lg me-2" style={{ WebkitTextStroke: "1.5px" }}></i>Unfriend
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
const Friends = ({ user, data }) => {

    data = data.filter(friend => friend.fid !== user);

    return(
        <div className="friends m-auto w-100 row">
            {   (data && data.length > 0) ?
                <><div className="col-md-6">
                    { data.slice(data.length / 2).map(friend => (<Friend side='s' data={friend} key={friend.fid}/>)) }
                </div>
                <div className="col-md-6">
                    { data.slice(0, data.length / 2).map(friend => (<Friend side='e' data={friend} key={friend.fid}/>)) }
                </div></> : "You have not made any friends yet"
            }
        </div>
    );
}

export default Friends;