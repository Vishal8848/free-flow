import { useState } from 'react';
import AuthProvider from './AuthProvider'
import Loader from '../components/Loader'
import { firebaseLogin } from '../firebase/firebaseAuth'

const Login = ({ shiftAuth, Inform }) => {

    const [ load, setLoad ] = useState(false);
    const [ check, setCheck ] = useState([ null, null ]);
    const [ cred, setCred ] = useState({ email: "", passwd: "", save: true });

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const Validate = () => {
        check[0] = cred.email.length > 0;
        check[1] = cred.passwd.length > 0;
        setCheck([...check ]);
        return ( check[0] && check[1] );
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(Validate())  {
            setLoad(true);
            firebaseLogin(cred)
            .then(data => setLoad(false))
            .catch(error => console.log(error));
        }
    }

    return ( 
        <div className="login-form text-center rounded bg-light p-3 shadow">

            <form className="form-floating" onSubmit={handleLogin}>
            
                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" id="email" name="email" className={`form-control ${ (check[0] != null && cred.email.length >= 0)  && (check[0] ? 'is-valid' : 'is-invalid')}`}
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[0] != null && cred.email.length >= 0) &&
                                !check[0] && "Required"
                            }
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="password" id="passwd" name="passwd" className={`form-control ${ (check[1] != null && cred.passwd.length === 0)  && (check[1] ? 'is-valid' : 'is-invalid')}`}
                            value={cred.passwd} onChange={(e) => setField('passwd', e.target.value)}/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;Password</label>
                        <div className="text-start fw-bold ps-2 text-danger">
                            {   (check[1] != null && cred.passwd.length >= 0) &&
                                !check[1] && "Required"
                            }
                        </div>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="form-check form-switch text-start ms-4">
                        <input className="form-check-input" role="switch" type="checkbox" id="rememberCred" style={{ height: "20px !important" }}
                            checked={cred.save} onChange={(e) => setField('save', e.target.checked)}/>
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