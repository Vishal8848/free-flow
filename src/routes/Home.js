import Freeflow from "../components/Freeflow";
import Login from '../auth/Login'

const Authentication = () => {
    return (
        <Login />
    );
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