import { useEffect, useState } from 'react'
import { Avatar, parseTime } from './Extras'
import { firebaseFriendRequests, firebaseUpdateRequest } from '../firebase/firebaseStore'

const Notification = ({ you, data, acceptRequest }) => {
 
    // status => 0 - Not Requested, 1 - Requested, 2 - Friends
    // you => true - Requested by You, false - Requested to You
    const { date, time }  = parseTime(data.createdAt)

    return (
        <div className={`search-user p-2 theme-inner`}>
            <Avatar image={data.dp} name={data.name} scale="square-sm" theme={data.theme}/>
            <div className="fs-6 mx-3 w-100">
                <div>{ data.name }</div>
                <div className="text-muted" style={{ fontSize: "12.5px" }}>
                    { time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { date }
                </div>
            </div>
            {   you ?
                    data.status === 2 ?
                    <span className="text-muted text-center" style={{ fontSize: "12.5px" }}>Request Accepted</span> :
                    <button className="btn btn-secondary btn-sm" disabled="disabled">Requested</button> :
                    <button className={`btn btn-${ data.status === 2 ? 'secondary' : 'success' } btn-sm`} 
                        onClick={() => acceptRequest(data.fid)}
                        disabled={ data.status === 2 ? "disabled" : "" }>
                        { data.status === 1 && <i className="fas fa-check me-2"></i> }
                        { data.status === 2 ? "Accepted" : "Accept" }
                    </button>                        
            }
        </div>
    )
}

const Notifications = ({ uid, bottom, notify }) => {

    const [ notes, setNotes ] = useState(null);

    console.log(notes)

    useEffect(() => {
        firebaseFriendRequests(uid, false).then(res => {
            if(!res.error)  setNotes(res.data)
        })
    }, [uid])

    const acceptRequest = (fid) => {
        firebaseUpdateRequest(uid, fid).then(() => {
            const updatedNotes = notes;
            for(let i = 0; i < updatedNotes.length; i++)
                if(updatedNotes[i].uid === uid && updatedNotes[i].fid === fid)
                    updatedNotes[i].status = 2;
            setNotes([...updatedNotes])
        })
    }

    return ( 
        <div className={`notifications p-2 mt-md-2 ${ bottom ? 'mobile' : 'shadow' } theme-inner`}>
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
                )) : "No Upcoming Notifications ..."
            }
        </div>
    );
}
 
export default Notifications;