import { useState } from 'react';
import { Loader } from '../components/Extras'
import { firebaseResetRequest } from '../firebase/firebaseAuth';

// Captcha Creation
const charSet = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789";
const getCaptcha = (size) => {    return (size) ? charSet.charAt(Math.floor((Math.random() * 100) + 1) % charSet.length) + getCaptcha(size-1) : "";   }

const RequestReset = ({ shiftAuth, Inform }) => {

    const [ load, setLoad ] = useState(false);
    const [ captcha, setCaptcha ] = useState(getCaptcha(5));
    
    const [ error, setError ] = useState({ status: false, message: null });
    const [ check, setCheck ] = useState([ null, null ]);

    const initial = { email: "", captcha: "" };
    const [ cred, setCred ] = useState(initial);

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const Reset = () => {
        setCred({...initial});
        setCheck([ null, null ]);
    }

    const Validate = () => {
        check[0] = cred.email.length > 0;
        check[1] = cred.captcha === captcha;
        if(!check[1]) setCaptcha(getCaptcha(5));
        setCheck([ ...check ]);
        return ( check[0] && check[1] );
    }

    const handleRequest = (e) => {
        e.preventDefault();
        if(Validate())  {
            setLoad(true);
            delete cred.captcha;
            firebaseResetRequest(cred).then(res => {
                Reset();
                setLoad(false);
                if(res.error)   {
                    error.status = true;
                    switch(res.data)  {
                        case 'auth/network-request-failed': error.message = "Please check your internet connection"; break;
                        case 'auth/user-not-found': error.message = "Username does not exist"; break;
                        default: error.message = "Some server issues, please try again later";
                    }   setError({...error});
                }   else {
                    Inform({ state: true, code: 1 });
                    shiftAuth(0);
                }
            })
        }
    }

    return ( 
        <div className="request-form text-center rounded bg-light p-3 shadow animate__animated animate__fadeInRight">
            
            <div className={`alert alert-danger p-2 fw-bold ${ !error.status && 'd-none' }`}>
                { error.message }
            </div>

            <form className="form-floating" onSubmit={handleRequest}>

                <div className="row mb-3">
                    
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" id="email" name="email" className={`form-control ${ check[0] != null && (check[0] ? 'is-valid' : 'is-invalid') }`}
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            { (check[0] != null && !check[0]) && "Required" }
                        </div>
                    </div>

                </div>

                <div className="row mb-3">
                        
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" className="form-control text-center pb-3" id="captcha-img" name="captcha-img" disabled value={captcha}/>
                    </div>
                    
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" placeholder="Enter Captcha" id="captcha" name="captcha" className={`form-control ${ check[1] != null && (check[1] ? 'is-valid' : 'is-invalid') }`}
                            value={cred.captcha} onChange={(e) => setField('captcha', e.target.value)}/>
                        <label htmlFor="captcha">&nbsp;&nbsp;&nbsp;Captcha</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            { (check[1] != null && !check[1]) && "Invalid Captcha" }
                        </div>
                    </div>
                
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100" defaultValue="Verify"/>

            </form>

            <div className="d-flex my-2 align-items-center justify-content-center">
                <button className="btn btn-danger w-100 h-75" style={{ height: "45px", cursor: "pointer" }}
                    onClick={() => shiftAuth(0)}>Cancel</button>
            </div>

            <Loader show={load}/>
        </div>
    );
}
 
export default RequestReset;