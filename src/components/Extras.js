import { useState, useEffect } from 'react'

export const getInitial = (name) => { return name.split(' ').filter((name) => name.length > 1).slice(0, 2).map((each) => each.charAt(0)).join('') }

export const parseDOB = (dob) => { 
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    
    const day = dob.split('-')[2], month = parseInt(dob.split('-')[1]) - 1;
    
    return day + ' ' + months[month];
}

export const Avatar = ({ image, name, scale = 'md', theme = 'primary' }) => {
    
    // Parse props.name
    const initial = getInitial(name);

    return ( 
        <div className={`avatar avatar-${scale} bg-${theme} m-0 px-${ scale === 'sm' ? '2' : '3' } py-${ scale === 'sm' && '3' }`}
            style={{ background: image ? `url(${image}) center center / cover no-repeat` : 'unset' }}>
            { (!image && initial.length > 0) && initial }
        </div>
    );
}

export const Loader = ({ show }) => {
    return ( 
        <div className={`loader ${show ? 'd-block' : 'd-none'}`}>
            <div className="square-set">
                <div className="square s-1"></div>
                <div className="square s-2"></div>
            </div>
        </div>
    );
}

export const Tooltip = ({ body }) => {
    return ( 
        <div className="tool-tip theme-middle shadow-sm">
            <div className="tint theme-middle tint-tm"></div>
            <div className="tooltip-content px-2">{ body }</div>
        </div>
    );
}

export const Toast = ({ show, code, value = null }) => {

    const [ toast, setToast ] = useState(show);

    useEffect(() => {
        const instance = document.getElementsByClassName('toast')[0].style;
        instance.display = toast ? 'block' : 'none';
    }, [toast]);
    
    const info = [
        {
            title: "Action Not Completed",
            body: "Please upload image less than 500KB",
            theme: 'danger',
            icon: 'upload',
            data: value,
            code: 0
        },
        {
            title: "Action Completed",
            body: value,
            theme: 'success',
            icon: 'upload',
            data: null,
            code: 0
        }
    ]

    return (
        <div className="toast position-absolute top-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true" style={{ borderRadius: "10px" }}>
            <div className="toast-header theme-inner border-0" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                <strong className="me-auto">
                    <i className={`fas fa-${info[code].icon} fa-lg me-2 text-${info[code].theme}`}></i>
                    { info[code].title }
                </strong>
                <i className="fas fa-times fa-lg" onClick={() => setToast(!toast)} style={{ cursor: "pointer" }}></i>
            </div>
            <div className="toast-body theme-middle" style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                { info[code].body } <br/>
                {   info[code].data &&
                    <>CURRENT SIZE<code className='fs-6'>&nbsp; { info[code].data }</code></>
                }
            </div>
        </div>
    )
}

export const parseTime = (timestring) => {
    const timestamp = parseInt(timestring)

    const thisDate = new Date(timestamp), today = new Date();

    const day = thisDate.toString().slice(0,3);
    
    const date = thisDate.toDateString().slice(4);
    
    let time = thisDate.toTimeString().split(' ')[0].slice(0,5);
    
    time = (parseInt(time.split(':')[0]) > 12) ? (parseInt(time.split(':')[0]) - 12) + time.slice(2) + ' PM' : time + ' AM';
    
    if(time.length === 7) time = '0' + time;
    
    /* ---------------------------------------------- */

    const dayDiff = today.getDate() - thisDate.getDate();
    const monthDiff = today.getMonth() - thisDate.getMonth();
    const yearDiff = today.getFullYear() - thisDate.getFullYear();

    const status = yearDiff === 0 ? monthDiff === 0 ? dayDiff === 0 ? "Today" : dayDiff === 1 ? "Yesterday" : "" : "" : ""

    return { date, day, time, status };
}

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const Freeflow = () => {
    return ( 
        <div className="h-100 d-flex align-items-center justify-content-center bg-light">
            <div id="phrase">
                
                <div className="d-flex">
                    <div className="me-2">
                        <h1>Share</h1>
                    </div>
                    
                    <div className="ms-2 carousel">
                        <div className="carousel-core">
                            <h1 className="text-danger">Love</h1>
                            <h1 className="text-success">Values</h1>
                            <h1 className="text-primary">Events</h1>
                            <h1 className="text-warning">Data</h1>
                        </div>
                    </div>
                </div>
                <h1>with Freeflow</h1>
                <h4>Ideas that Resonate</h4>
                
                <div id="color-balls">
                    <div id="red-ball"><i className="fas fa-circle text-danger me-2"></i></div>
                    <div id="green-ball"><i className="fas fa-circle text-success me-2"></i></div>
                    <div id="blue-ball"><i className="fas fa-circle text-primary me-2"></i></div>
                    <div id="yellow-ball"><i className="fas fa-circle text-warning"></i></div>
                </div>
            </div>
        </div>
    );
}