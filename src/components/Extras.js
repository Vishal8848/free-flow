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

// function CollapseDemo() {
//   return (
//     <div className="py-2">
//         <button className="btn btn-primary" data-bs-target="#collapseTarget" data-bs-toggle="collapse">
//             Toggle collapse
//         </button>
//         <div className="collapse" id="collapseTarget">
//             This is the toggle-able content!
//         </div>
//     </div>
//   )
// }

// function PopoverDemo() {
//     const popoverRef = useRef();    

//     useEffect(() => {
//         var popover = new Popover(popoverRef.current, {
//             content: "Hello popover content!",
//             title: "My Popover",
//             trigger: 'hover'
//         })
//     })
    
//     return (
//         <div className="py-2">
//             <button className="btn btn-danger" ref={popoverRef}>
//                 Hover for popover
//             </button>
//         </div>
//     )
// }

// function ToastDemo() {
//     var [toast, setToast] = useState(false);
//     const toastRef = useRef();

//     useEffect(() => {
//         var myToast = toastRef.current
//         var bsToast = bootstrap.Toast.getInstance(myToast)
        
//         if (!bsToast) {
//             // initialize Toast
//             bsToast = new Toast(myToast, {autohide: false})
//             // hide after init
//             bsToast.hide()
//             setToast(false)
//         }
//         else {
//             // toggle
//             toast ? bsToast.show() : bsToast.hide()

//         }
//     })

//     return (
//     <div className="py-2">
//         <button className="btn btn-success" onClick={() => setToast(toast => !toast)}>
//             Toast {toast?'hide':'show'}
//         </button>
//         <div className="toast position-absolute top-0 end-0 m-4" role="alert" ref={toastRef}>
//             <div className="toast-header">
//                 <strong className="me-auto">Bootstrap 5</strong>
//                 <small>4 mins ago</small>
//                 <button type="button" className="btn-close" onClick={() => setToast(false)} aria-label="Close"></button>
//             </div>
//             <div className="toast-body">
//               Hello, world! This is a toast message.
//             </div>
//         </div>
//     </div>
//     )
// }

// function TooltipDemo() {
//     const tooltipRef = useRef();  

//     useEffect(() => {
//         var tooltip = new Tooltip(tooltipRef.current, {
//             title: "This is the tooltip content!",
//             placement: 'right',
//             trigger: 'hover'
//         })
//     })
    
//     return (
//         <div className="py-2">
//             <button className="btn btn-info" ref={tooltipRef}>
//                 Hover for tooltip
//             </button>
//         </div>
//     )
// }

// function AlertDemo() {
//     var [message, setMessage] = useState('...')
//     const alertRef = useRef()
    
//     const showAlert = () => {
//         setMessage("Holy guacamole! This is my alert")
//         const alertEle = alertRef.current
//         const bsAlert = new bootstrap.Alert(alertEle)
//         alertEle.classList.add('show')
        
//         // hide alert after 5 seconds
//         setTimeout(()=>{
//             bsAlert.close()
//         }, 5000)
//     }

//     return (
//         <div className="py-2">
//             <button className="btn btn-warning" onClick={showAlert}>
//                 Trigger alert
//             </button>
//             <div className="position-absolute top-0 end-0 m-4">
//                 <div className="alert alert-warning alert-dismissible fade" ref={alertRef} role="alert">
//                   { message }
//                   <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function ModalDemo() {
//     // using data-bs attributes only here...
//     return (
//         <div className="py-2">
//             <button className="btn btn-dark" data-bs-target="#myModal" data-bs-toggle="modal">
//                 Show modal
//             </button>
//             <div className="modal" tabIndex="-1" id="myModal">
//               <div className="modal-dialog">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Modal title</h5>
//                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                   </div>
//                   <div className="modal-body">
//                     <p>Modal body text goes here.</p>
//                   </div>
//                   <div className="modal-footer">
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                     <button type="button" className="btn btn-primary">Save changes</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//         </div>
//     )
// }

// const DropdownDemo = () => {
//     const ddRef = useRef()  

//     useEffect(() => {
//         var dd = new Dropdown(ddRef.current, {})
//     })
    
//     return (
//         <div className="py-2">
//             <div className="dropdown">
//               <button className="btn btn-secondary dropdown-toggle" type="button" ref={ddRef} aria-expanded="false">
//                 Dropdown button
//               </button>
//               <ul className="dropdown-menu" aria-labelledby="dropdown1">
//                 <li><a className="dropdown-item" href="#">Action</a></li>
//                 <li><a className="dropdown-item" href="#">Another action</a></li>
//                 <li><a className="dropdown-item" href="#">Something else here</a></li>
//               </ul>
//             </div>
//         </div>
//     )
// }