import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Freeflow } from "../components/Extras"
import RequestReset from '../auth/RequestReset'
import Banner from '../components/Banner'
import Register from '../auth/Register'
import Login from '../auth/Login'
import { AuthContext } from "../App"

const Authentication = ({ Inform }) => {

    const [ activeAuth, setActiveAuth ] = useState(0);

    const form = [ 
        <Login shiftAuth={setActiveAuth}/>, 
        <Register shiftAuth={setActiveAuth} Inform={Inform}/>,
        <RequestReset shiftAuth={setActiveAuth} Inform={Inform}/>
    ];

    return ( form[activeAuth] );
}

const Home = () => {

    const setRoute = useNavigate();
    const { auth } = useContext(AuthContext);
    
    const [ inform, setInform ] = useState({ state: false, code: 0 });

    useEffect(() => { 
        if(auth.status)
            auth.data.last ? setRoute('/feed') : setRoute('/profile/' + auth.data.uid.split("").reverse().join(""))
    }, [auth, setRoute])

    return (<>
        <div id="home" className="container-fluid bg-light">
            <div className="row gx-0">
                <div id="free-flow" className="col-md-6">
                    <Freeflow />
                </div>
                <div id="form-set" className="col-md-6 p-0">
                    <Authentication Inform={setInform} setRoute={setRoute}/>
                </div>
            </div>
            { inform.state && <Banner status={inform.code}/>  }
        </div>
    </>);
}
 
export default Home;