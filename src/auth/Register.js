import { useState} from 'react'
import { Loader } from '../components/Extras'
import { firebaseRegister } from '../firebase/firebaseAuth';

// Regex
const Name = new RegExp(/^[a-zA-Z0-9 ]+$/);
const Pass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
const Email = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const Register = ({ shiftAuth, Inform }) => {

    const [ load, setLoad ] = useState(false);

    // User Cred
    const initial = { fname: "",  lname: "", dob: "", gender: "", email: "", passwd: "", cpasswd: "" };
    const [ cred, setCred ] = useState(initial);

    // User Validation
    const [ error, setError ] = useState({ status: false, message: null });
    const [ check, setCheck ] = useState([ null, null, null, null, null, null, null, null ]);

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const Reset = () => {
        setCred({...initial});
        setCheck([ null, null, null, null, null, null, null, null ]);
    }

    const Validate = () => {
        // 2 - Success 1 - Invalid 0 - Required
        check[0] = cred.fname.length > 0 ? Name.test(cred.fname) ? 2 : 1 : 0;
        check[1] = cred.lname.length > 0 ? Name.test(cred.lname) ? 2 : 1 : 2;
        check[2] = cred.dob.length > 0 ? 2 : 0;
        check[3] = cred.gender.length > 0 ? 2 : 0;
        check[4] = cred.email.length > 0 ? Email.test(cred.email) ? 2 : 1 : 0;
        check[5] = cred.passwd.length > 0 ? Pass.test(cred.passwd) ? 2 : 1 : 0;
        check[6] = cred.cpasswd.length > 0 ? Pass.test(cred.cpasswd) ? 2 : 1 : 0;
        check[7] = (check[5] === 2 && (cred.passwd === cred.cpasswd)) ? 2 : 1;
        setCheck([...check]);
        return check.every( e => e === 2);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(Validate())  {
            setLoad(true);
            delete cred.cpasswd;
            firebaseRegister(cred).then(res => {
                Reset();
                setLoad(false);
                if(res.error)   {
                    error.status = true;
                    switch(res.data)    {
                        case 'auth/email-already-in-use': error.message = "User already registered"; break;
                        case 'auth/invalid-email': error.message = "Invalid email address"; break;
                        case 'auth/weak-password': error.message = "Weak password"; break;
                        case 'auth/network-request-failed': error.message = "Please check your internet connection"; break;
                        default:  error.message = "Server issues. Please try again later"; console.log(res.data)
                    }   setError({...error});
                }   else {
                    Inform({ state: true, code: 0 });
                    shiftAuth(0);
                }
            })
        }
    }

    return ( 
        <div className="register-form text-center rounded bg-light p-3 shadow animate__animated animate__fadeInRight">

            <div className={`alert alert-danger p-2 fw-bold ${ !error.status && 'd-none' }`}>
                { error.message }
            </div>

            <form onSubmit={handleRegister}>
                
                <div className="row mb-3">
                    
                    <div className="col-md-6 form-floating">
                        <input type="text" id="fname" name="fname" placeholder="Roberto" className={`form-control ${ check[0] != null && (check[0] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.fname} onChange={(e) => setField('fname', e.target.value)}/>
                        <label htmlFor="fname">&nbsp;&nbsp;&nbsp;First Name</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[0] != null && check[0] !== 2) &&
                                (check[0] === 1 ? "Invalid Name" : check[0] === 0 && "Required")
                            }
                        </div>
                    </div>
                    
                    <div className="col-md-6 form-floating">
                        <input type="text" id="lname" name="lname" placeholder="Carlos" className={`form-control ${ check[1] != null && (check[1] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.lname} onChange={(e) => setField('lname', e.target.value)}/>
                        <label htmlFor="lname">&nbsp;&nbsp;&nbsp;Last Name</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[1] != null && check[1] !== 2) &&
                                (check[1] === 1 && "Invalid Name")
                            }
                        </div>
                    </div>

                </div>

                <div className="row mb-3">
                    
                    <div className="col-md-6 form-floating">
                        <input type="text" id="dob" name="dob" className={`form-control ${ check[2] != null && (check[2] === 2 ? 'is-valid' : 'is-invalid') }`}
                            onFocus={ (e) => e.target.type = "date" } placeholder="00-00-0000" max="2021-12-31"
                            value={cred.dob} onChange={(e) => setField('dob', e.target.value)}/>
                        <label htmlFor="dob">&nbsp;&nbsp;&nbsp;Date of Birth</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[2] != null && check[2] !== 2) &&
                                (check[2] === 0 && "Required")
                            }
                        </div>
                    </div>

                    <div className="col-md-6">
                        <select id="gender" style={{ height: "100%" }} className={`form-select ${ check[3] != null && (check[3] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.gender} onChange={(e) => setField('gender', e.target.value)}>
                            <option value="" disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[3] != null && check[3] !== 2) &&
                                (check[3] === 0 && "Required")
                            }
                        </div>
                    </div>

                </div>
                
                <div className="row mb-3">
                
                    <div className="form-floating l-one">
                        <input type="email" id="email" name="email" className={`form-control ${ check[4] != null && (check[4] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[4] != null && check[4] !== 2) &&
                                (check[4] === 1 ? "Invalid Email Address" : check[4] === 0 && "Required")
                            }
                        </div>
                    </div>
                
                </div>

                <div className="row mb-3">
                
                    <div className="col-md-6 form-floating">
                        <input type="password" id="passwd" name="passwd" className={`form-control ${ check[5] != null && (check[5] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.passwd} onChange={(e) => setField('passwd', e.target.value)}/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;Password</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[5] != null && check[5] !== 2) &&
                                (check[5] === 1 ? "Weak Password" : check[5] === 0 && "Required")
                            }
                        </div>
                    </div>
                
                    <div className="col-md-6 form-floating">
                        <input type="password" id="cpasswd" name="cpasswd" className={`form-control ${ (check[6] != null && check[7] != null) && ((check[6] === 2 && check[7] === 2) ? 'is-valid' : 'is-invalid') }`}
                            value={cred.cpasswd} onChange={(e) => setField('cpasswd', e.target.value)}/>
                        <label htmlFor="cpasswd">&nbsp;&nbsp;&nbsp;Confirm</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[6] != null) && check[6] !== 2 ?
                                (check[6] === 1 ? "Weak Password" : check[6] === 0 && "Required") :
                                (check[7] === 1 && "Not Matching")
                            }
                        </div>
                    </div>
                
                </div>
                
                <div className="text-muted text-start" style={{ fontSize: "12.5px" }}>
                    Password must be minimum 8 characters with atleast one lowercase, uppercase, number and special character.
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100 fs-5" value="Sign Up"/>
            </form>

            <div className="d-flex my-2 align-items-center justify-content-center">
                <div className="fw-bold">Already a User ?&nbsp;</div>
                <div className="text-primary fw-bold" style={{ cursor: "pointer" }}
                    onClick={() => shiftAuth(0)}> Sign In </div>
            </div>

            <Loader show={load}/>
        </div>
    );
}
 
export default Register;