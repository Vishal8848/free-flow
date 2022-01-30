import { useState } from 'react';
import Loader from '../components/Loader'
import { firebaseResetPasswd } from '../firebase/firebaseAuth';

// Regex
const Pass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const ResetPasswd = ({ shiftAuth }) => {

    const [ load, setLoad ] = useState(false);
    const [ check, setCheck ] = useState([ null, null, null ]);
    const [ cred, setCred ] = useState({ email: "vish***********@gmail.com", passwd: "", cpasswd: "", code: "" });

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const Validate = () => {
        check[0] = cred.passwd.length > 0 ? Pass.test(cred.passwd) ? 2 : 1 : 0;
        check[1] = cred.cpasswd.length > 0 ? Pass.test(cred.cpasswd) ? 2 : 1 : 0;
        check[2] = (check[0] === 2 && (cred.passwd === cred.cpasswd)) ? 2 : 1;
        setCheck([...check]);
        return check.every(e => e === 2);
    }

    const handleReset = (e) => {
        e.preventDefault();
        if(Validate())  {
            setLoad(true);
            delete cred.cpasswd;
            firebaseResetPasswd(cred)
            .then(() => console.log('Password Reset'))
            .catch(error => console.log(error));
        }
    }

    return ( 
        <div className="reset-form text-center rounded bg-light p-3 shadow">
            
            <form className="form-floating" onSubmit={handleReset}>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                            <input type="email" className="form-control" id="email" name="email" disabled defaultValue={cred.email}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" id="passwd" name="passwd" className={`form-control ${ check[0] != null && (check[0] === 2 ? 'is-valid' : 'is-invalid') }`}
                            value={cred.passwd} onChange={(e) => setField('passwd', e.target.value)}/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;New Password</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[0] != null && check[0] !== 2) &&
                                (check[0] === 1 ? "Weak Password" : check[0] === 0 && "Required")
                            }
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" id="cpasswd" name="cpasswd" className={`form-control ${ (check[1] != null && check[2] != null) && ((check[1] === 2 && check[2] === 2) ? 'is-valid' : 'is-invalid') }`}
                            value={cred.cpasswd} onChange={(e) => setField('cpasswd', e.target.value)}/>
                        <label htmlFor="cpasswd">&nbsp;&nbsp;&nbsp;Confirm Password</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[1] != null) && check[1] !== 2 ?
                                (check[1] === 1 ? "Weak Password" : check[1] === 0 && "Required") :
                                (check[2] === 1 && "Not Matching")
                            }
                        </div>
                    </div>
                </div>

                <div className="text-muted text-start" style={{ fontSize: "12.5px", width: "375px" }}>
                    Password must be minimum 8 characters with atleast one lowercase, uppercase, number and special character.
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100" value="Submit"/>
            </form>
            <div className="d-flex my-2 align-items-center justify-content-center">
                <button className="btn btn-danger w-100 h-75" style={{ height: "45px", cursor: "pointer" }}
                    onClick={() => shiftAuth(0)}>Cancel</button>
            </div>

            <Loader show={load}/>
        </div>
    );
}
 
export default ResetPasswd;