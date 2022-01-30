import { useState } from "react";
import { Freeflow } from "../components/Extras"
import RequestReset from '../auth/RequestReset'
import ResetPasswd from '../auth/ResetPasswd'
import Inform from '../components/Inform'
import Register from '../auth/Register'
import Login from '../auth/Login'

const Authentication = ({ Inform }) => {

    const [ activeAuth, setActiveAuth ] = useState(0);
    const form = [ 
        <Login shiftAuth={setActiveAuth} Inform={Inform}/>, 
        <Register shiftAuth={setActiveAuth} Inform={Inform}/>,
        <RequestReset shiftAuth={setActiveAuth} Inform={Inform}/>,
        <ResetPasswd shiftAuth={setActiveAuth} Inform={Inform}/>
    ];

    return ( form[activeAuth] );
}

const Home = () => {

    const [ inform, setInform ] = useState({ state: false, code: 0 });

    return (<>
        <div id="home" className="container-fluid bg-light">
            <div className="row border">
                <div id="free-flow" className="col-md-6">
                    <Freeflow />
                </div>
                <div id="form-set" className="col-md-6">
                    <Authentication Inform={setInform}/>
                </div>
            </div>
            { inform.state && <Inform status={inform.code}/>  }
        </div>
    </>);
}
 
export default Home;