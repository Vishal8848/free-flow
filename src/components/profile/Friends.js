// Default
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../App'

// Imports
import friendsImg from '../../assets/friends.png'
import { Avatar } from '../Extras'

const Friend = ({ data, theme, mutual, side }) => {

    const common = data.list.filter(friend => mutual.includes(friend)).length - 1

    return ( 
        <div className={`friend p-2 rounded shadow-sm m${side}-md-auto mt-4 theme-${theme}-inner`}>

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

    const { theme } = useContext(ThemeContext)

    data = data.filter(friend => friend.fid !== user.uid);

    return(
        <div className="friends m-auto w-100 row">
            {   (data && data.length > 0) ?
                <><div className="col-md-6">
                    { data.slice(data.length / 2).map(friend => (<Friend side='s' theme={theme} data={friend} mutual={user.friends.filter(friend => friend !== user.uid)} key={friend.fid}/>)) }
                </div>
                <div className="col-md-6">
                    { data.slice(0, data.length / 2).map(friend => (<Friend side='e' theme={theme} data={friend} mutual={user.friends.filter(friend => friend !== user.uid)} key={friend.fid}/>)) }
                </div></> :
                <div className={`notice text-muted theme-${theme}-inner px-5`} style={{ width: "100%" }}>
                    { friendsImg && <img src={friendsImg} alt="Friends" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Your Friends</strong><br/>
                    Make friends and see them here
                </div>
            }
        </div>
    );
}

export default Friends;