import { useState } from 'react'

/**
 * 0 - Registration Successful
 * 1 - Reset Password Successful
 * 2 - Reset Password Initiated
 * 3 - Invalid Redirect Request
*/

const Inform = ({ status }) => {

    const [ view, setView ] = useState(true);

    const info = [
        {
            title: "Registration Successful",
            body: "Thank you for joining Freeflow. Follow the link sent to your inbox to verify email and login to start using Freeflow",
            skin: "success",
            icon: "check",
            exit: true,
            code: 0
        },
        {
            title: "Reset Password Successful",
            body: "Your credentials has been updated successfully. Login with new credentials and enjoy using Freeflow",
            skin: "success",
            icon: "lock",
            exit: true,
            code: 1
        },
        {
            title: "Reset Password Initiated",
            body: "Attempt to update credentials has been recognised. Follow the verification link sent to your inbox to reset your password",
            skin: "primary",
            icon: "key",
            exit: false,
            code: 2
        },
        {
            title: "Invalid Redirect Request",
            body: "Please check the link you clicked. The link may be expired or faulty. Use latest link or initiate a new request",
            skin: "danger",
            icon: "unlink",
            exit: true,
            code: 3
        }
    ]
    
    return ( 
        <div id="inform-modal" className="modal-container" style={ view ? { display: "block" } : { display: "none" } } >
            <div className="i-modal shadow animate__animated animate__fadeInDown">
                <div className={`i-modal-header text-light px-4 py-3 d-flex align-items-center justify-content-between bg-${info[status].skin}`}>
                    <div>{ info[status].title }</div>
                    { info[status].exit && <div onClick={() => setView(false)} style={{ cursor: "pointer" }}><i className="fas fa-times"></i></div> }
                </div>
                <div className="i-modal-main d-flex align-items-center py-2">
                    <div style={{ flex: "30%" }}>
                        <div className="icon-circle bg-light" style={{ width: "100px", height: "100px" }}>
                            <div className="icon">
                                <i className={`fas fa-3x fa-${info[status].icon} text-${info[status].skin}`}></i>
                            </div>
                        </div>
                    </div>
                    <div className="i-body p-3" style={{ flex: "70%" }}>
                        <p className={`fw-bold text-muted text-justify ${ (status === 0 || status === 2) && 'pt-3' }`}>
                            { info[status].body }
                        </p>
                        { info[status].exit && <button onClick={() => setView(false)} className={`btn btn-${info[status].skin} btn-sm shadow`}>Continue</button> }
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default Inform;