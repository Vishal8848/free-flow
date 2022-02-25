// Default
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { firebaseFriendRequests, firebaseUpdateRequest } from '../../firebase/firebaseStore'

// Imports
import { Avatar, parseTime } from '../Extras'
import notifyImg from '../../assets/mail.png'
import { ThemeContext } from '../../App'

const Notification = ({ you, data, acceptRequest }) => {
 
    // status => 0 - Not Requested, 1 - Requested, 2 - Friends
    // you => true - Requested by You, false - Requested to You
    const { date, time }  = parseTime(data.createdAt)

    return (
        <div className={`search-user p-2 mt-2`} style={{ borderRadius: "10px" }}>
            <Link to={`/profile/${data.uid.split("").reverse().join("")}`}>
                <Avatar image={data.dp} name={data.name} scale="square-sm" theme={data.theme}/>
            </Link>
            <div className="fs-6 mx-3 w-100">
                <Link to={`/profile/${data.uid.split("").reverse().join("")}`}>
                    <div>{ data.name }</div>
                </Link>
                <div className="text-muted" style={{ fontSize: "12.5px" }}>
                    { time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { date }
                </div>
            </div>
            {   you ?
                    data.status === 2 ?
                    <span className="text-muted text-center" style={{ fontSize: "12.5px" }}>Request Accepted</span> :
                    <button className="btn btn-secondary btn-sm" disabled="disabled">Requested</button> :
                    <button className={`btn btn-${ data.status === 2 ? 'secondary' : 'success' } btn-sm`} 
                        onClick={() => acceptRequest(data.uid)}
                        disabled={ data.status === 2 ? "disabled" : "" }>
                        { data.status === 1 && <i className="fas fa-check me-2"></i> }
                        { data.status === 2 ? "Accepted" : "Accept" }
                    </button>                        
            }
        </div>
    )
}

const Notifications = ({ uid, bottom, notify }) => {

    const { theme } = useContext(ThemeContext)

    let [ notes, setNotes ] = useState(null);

    useEffect(() => {
        firebaseFriendRequests(uid, false).then(res => {
            if(!res.error)  setNotes(res.data)
        })
    }, [uid])

    const acceptRequest = (fid) => {
        firebaseUpdateRequest(uid, fid).then(() => {
            for(let i = 0; i < notes.length; i++)
                if(notes[i].uid === fid && notes[i].fid === uid)
                    notes[i].status = 2;
            setNotes([...notes])
        })
    }

    return ( 
        <div className={`notifications p-2 mt-md-2 me-md-5 ${ bottom ? 'mobile' : 'shadow-lg' } theme-${theme}-middle animate__animated animate__slideIn${ bottom ? "Up" : "Down" }`}>
            { !bottom && <div className="tint tint-tr"></div> }
            {   bottom ?
                <div className="d-flex align-items-center justify-content-between text-muted">
                    <div className="feed-title ps-2 fw-bold">Notifications</div>
                    <div><i className="fas fa-times fa-lg pe-2" onClick={() => notify(false)} style={{ cursor: "pointer" }}></i></div>
                </div> :
                <span className="feed-title ps-3 text-muted fw-bold">Notifications</span>
            }
            {   notes && notes.length > 0 ?
                notes.map(note => (
                    <Notification you={note.uid === uid} data={note} acceptRequest={acceptRequest} key={note.createdAt}/>
                )) :
                <div className="notice text-muted px-5" style={{ borderRadius: "10px", paddingTop: "25px", paddingBottom: "25px" }}>
                    { notifyImg && <img src={notifyImg} alt="Notifications" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Notifications</strong><br/>
                    Acknowledge friend requests here
                </div>
            }
        </div>
    );
}
 
export default Notifications;