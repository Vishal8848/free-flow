import { Avatar } from '../Extras'
import { Link } from 'react-router-dom';

const Friend = ({ data, mutual, side }) => {

    const common = data.list.filter(friend => mutual.includes(friend)).length - 1

    return ( 
        <div className={`friend p-2 rounded shadow-sm m${side}-md-auto mt-4 theme-inner`}>

            <div className="friend-img">
                <Link to={`/profile/${data.fid.split("").reverse().join("")}`}>
                    <Avatar image={data.dp} name={data.name} scale="square" theme={data.theme}/>
                </Link>
            </div>

            <div className="friend-desc ps-3">
                <Link to={`/profile/${data.fid.split("").reverse().join("")}`}>
                    <span className="fs-5 fw-bold">{ data.name }</span>
                </Link><br/>
                <span className="fs-6 text-muted">
                { `${common > 0 ? common : 'no' } mutual friend${common > 1 || common === 0 ? 's' : ''}` }
                </span>
            </div>
        </div>
    );
}

const Friends = ({ user, data }) => {

    data = data.filter(friend => friend.fid !== user.uid);

    return(
        <div className="friends m-auto w-100 row">
            {   (data && data.length > 0) ?
                <><div className="col-md-6">
                    { data.slice(data.length / 2).map(friend => (<Friend side='s' data={friend} mutual={user.friends.filter(friend => friend !== user.uid)} key={friend.fid}/>)) }
                </div>
                <div className="col-md-6">
                    { data.slice(0, data.length / 2).map(friend => (<Friend side='e' data={friend} mutual={user.friends.filter(friend => friend !== user.uid)} key={friend.fid}/>)) }
                </div></> : "You have not made any friends yet"
            }
        </div>
    );
}

export default Friends;