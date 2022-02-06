import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Freeflow } from "../components/Extras"
import RequestReset from '../auth/RequestReset'
// import ResetPasswd from '../auth/ResetPasswd'
import Inform from '../components/Inform'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { UserContext } from "../App"

import { firebaseUser } from '../firebase/firebaseStore'

const Authentication = ({ Inform, setRoute }) => {

    const [ activeAuth, setActiveAuth ] = useState(0);

    const form = [ 
        <Login shiftAuth={setActiveAuth}/>, 
        <Register shiftAuth={setActiveAuth} Inform={Inform}/>,
        <RequestReset shiftAuth={setActiveAuth} Inform={Inform}/>,
        // <ResetPasswd shiftAuth={setActiveAuth} Inform={Inform}/>
    ];

    return ( form[activeAuth] );
}

const Home = () => {

    const setRoute = useNavigate();
    const { user, setUser } = useContext(UserContext);
    
    const access = JSON.parse(window.localStorage.getItem('access'));
    const [ inform, setInform ] = useState({ state: false, code: 0 });

    if(access != null) setUser({ auth: true, data: access });

    useEffect(() => { 
        if(user.auth)   {
            firebaseUser(user.data.uid).then(res => {  
                // if(!res.error) res.data.lastActive ? setRoute('/feed') : setRoute('/profile')
                console.log(res)
            })
        }
    }, [user, setRoute])

    return (<>
        <div id="home" className="container-fluid bg-light">
            <div className="row border">
                <div id="free-flow" className="col-md-6">
                    <Freeflow />
                </div>
                <div id="form-set" className="col-md-6">
                    <Authentication Inform={setInform} setRoute={setRoute}/>
                </div>
            </div>
            { inform.state && <Inform status={inform.code}/>  }
        </div>
    </>);
}
 
export default Home;