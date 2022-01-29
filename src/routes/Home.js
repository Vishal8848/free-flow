import { useState } from "react";
import Freeflow from "../components/Freeflow"
import RequestReset from '../auth/RequestReset'
import ResetPasswd from '../auth/ResetPasswd'
import Register from '../auth/Register'
import Login from '../auth/Login'

const Authentication = () => {

    const [ activeAuth, setActiveAuth ] = useState(0);
    const form = [ 
        <Login shiftAuth={setActiveAuth}/>, 
        <Register shiftAuth={setActiveAuth}/>,
        <RequestReset shiftAuth={setActiveAuth}/>,
        <ResetPasswd shiftAuth={setActiveAuth}/>
    ];

    return ( form[activeAuth] );
}

const Home = () => {
    return (<>
        <div id="home" className="container-fluid bg-light">
            <div className="row border">
                <div id="free-flow" className="col-md-6">
                    <Freeflow />
                </div>
                <div id="form-set" className="col-md-6">
                    <Authentication />
                </div>
            </div>
        </div>
    </>);
}
 
export default Home;