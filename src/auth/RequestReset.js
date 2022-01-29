import { useState } from 'react';
import Loader from '../components/Loader'

const RequestReset = ({ shiftAuth }) => {

    const [ load, setLoad ] = useState(false);
    const [ cred, setCred ] = useState({ email: "", captcha: "" });

    const setField = (key, value) => {
        let fields = cred;
        fields[key] = value;
        setCred({...fields});
    }

    const handleRequest = (e) => {
        e.preventDefult();
        setLoad(true);
    }

    return ( 
        <div className="request-form text-center rounded bg-light p-3 shadow">
            
            <form className="form-floating" onSubmit={handleRequest}>

                <div className="row mb-3">
                    
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" className="form-control" id="email" name="email" required
                            value={cred.email} onChange={(e) => setField('email', e.target.value)}/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                    </div>

                </div>

                <div className="row mb-3">
                        
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" className="form-control text-center pb-3" id="captcha-img" name="captcha-img"
                            disabled value="AB0x2"/>
                    </div>
                    
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" className="form-control" placeholder="Enter Captcha" id="captcha" name="captcha" required
                            value={cred.captcha} onChange={(e) => setField('captcha', e.target.value)}/>
                        <label htmlFor="captcha">&nbsp;&nbsp;&nbsp;Captcha</label>
                    </div>
                
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100" value="Verify" onClick={() => shiftAuth(3)}/>

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