import { useState } from 'react';
import Loader from '../components/Loader'

const ResetPasswd = ({ shiftAuth }) => {

    const [ load, setLoad ] = useState({ passwd: "" });
    const [ cred, setCred ] = useState({ email: "", passwd: "", cpasswd: "" });

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const handleReset = (e) => {
        e.preventDefault();
        setLoad(true);
    }

    return ( 
        <div className="reset-form text-center rounded bg-light p-3 shadow">
            
            <form className="form-floating" onSubmit={handleReset}>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" className="form-control" id="email" name="email" disabled
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" className="form-control" id="passwd" name="passwd" required
                            value={cred.passwd} onChange={(e) => setField('passwd', e.target.value)}/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;New Password</label>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" className="form-control" id="cpasswd" name="cpasswd" required
                            value={cred.cpasswd} onChange={(e) => setField('cpasswd', e.target.value)}/>
                        <label htmlFor="cpasswd">&nbsp;&nbsp;&nbsp;Confirm Password</label>
                    </div>
                </div>

                <div className="text-muted text-start" style={{ fontSize: "12.5px", width: "375px" }}>
                    Password must be minimum 8 characters with atleast one lowercase, uppercase, number and special character.
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100" value="Submit" onClick={() => { console.log("Password Reset"); shiftAuth(0) }}/>
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