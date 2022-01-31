import { useState } from 'react'
import { Avatar, parseTime } from './Extras'

const Notification = ({ nb, accept }) => {
 
    // false - Requested you -> Accept
    // true - Accepted you -> none
    const [ request, setRequest ] = useState(false);
    const { date, time }  = parseTime(Date.now())

    return (
        <div className={`search-user p-2 ${ !nb && 'border-bottom' }`}>
            <Avatar name="Vishal Pranav" scale="sm" theme="success"/>
            <div className="fs-6 mx-3 w-100">
                <div className="fw-bold">Abishek Prasannaa</div>
                <div className="text-muted" style={{ fontSize: "12.5px" }}>{ time } <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> { date }</div>
            </div>
            {   accept ?
                <span className="text-muted text-center" style={{ fontSize: "12.5px" }}>Request Accepted</span> :
                <button className={`btn btn-${ request ? 'secondary' : 'success' } btn-sm`} onClick={() => setRequest(true)} disabled={ request ? "disabled" : "" }>
                    { !request && <i className="fas fa-check me-2"></i> }
                    { request ? "Accepted" : "Accept" }
                </button>
            }
        </div>
    )
}

const Notifications = ({ bottom, notify }) => {
    return ( 
        <div className={`notifications p-2 mt-md-2 border ${ bottom ? 'mobile' : 'shadow' }`}>
            { !bottom && <div className="tint tint-tr"></div> }
            {   bottom ?
                <div className="d-flex align-items-center justify-content-between text-muted">
                    <div className="feed-title ps-2 fw-bold">Notifications</div>
                    <div><i className="fas fa-times fa-lg pe-2" onClick={() => notify(false)} style={{ cursor: "pointer" }}></i></div>
                </div> :
                <span className="feed-title ps-3 text-muted fw-bold">Notifications</span>
            }
            <Notification accept/>
            <Notification/>
            <Notification/>
            <Notification accept={true}/>
            <Notification nb={true}/>
        </div>
    );
}
 
export default Notifications;