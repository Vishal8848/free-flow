import AuthProvider from './AuthProvider'
import Loader from '../components/Loader'
import { useState } from 'react';

const Login = ({ shiftAuth }) => {

    const [ load, setLoad ] = useState(false);
    const [ cred, setCred ] = useState({ email: "", passwd: "" });

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoad(true);
    }

    return ( 
        <div className="login-form text-center rounded bg-light p-3 shadow">

            <form className="form-floating" onSubmit={handleLogin}>
            
                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" className="form-control" id="email" name="email" required
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" className="form-control" id="passwd" name="passwd" required
                            value={cred.passwd} onChange={(e) => setField('passwd', e.target.value)}/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;Password</label>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="form-check form-switch text-start ms-4">
                        <input className="form-check-input" role="switch" type="checkbox" id="rememberCred" defaultChecked  style={{ height: "20px !important" }}/>
                        <label className="form-check-label fw-bold" htmlFor="rememberCred">Remember Credentials</label>
                    </div>
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100 fs-5" value="Sign In"/>
            </form>

            <div className="d-flex my-2 align-items-center justify-content-between">
            
                <div className="text-primary fw-bold" style={{ cursor: "pointer" }}
                    onClick={() => shiftAuth(2)}> Forgot Password ? </div>

                <div className="d-flex align-items-center justify-content-end">
                    <div className="fw-bold">New User ?&nbsp;</div>
                    <div className="text-primary fw-bold" style={{ cursor: "pointer" }}
                        onClick={() => shiftAuth(1)}> Sign Up </div>
                </div>
            
            </div>

            <AuthProvider />

            <Loader show={load}/>
        </div>
    );
}
 
export default Login;