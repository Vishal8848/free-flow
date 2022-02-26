// Default
import { useContext } from "react"

// Firebase
import { firebaseGoogleLogin } from "../firebase/firebaseAuth"

// Imports
import { AuthContext } from "../App"

const GoogleProvider = () => {

    const { setAuth } = useContext(AuthContext);

    const handleProvider = () => {
        firebaseGoogleLogin().then(res => {
            if(res.error)   {
                console.log(res.data)
            }   else setAuth({ status: true, data: res.data })
        })
    }

    return (<>
        <div className="d-flex my-2 align-items-center justify-content-center">
            <div className="border border-dark" style={{ width: "100%" }}></div>
            <div className="text-dark fw-bold mx-3">OR</div>
            <div className="border border-dark" style={{ width: "100%" }}></div>
        </div>
        <div className="p-2 m-auto rounded-pill border border-3" onClick={() => handleProvider()} style={{ cursor: "pointer", width: "fit-content" }}>
            <i className="fab fa-google fa-lg text-primary me-2"></i> 
            <strong>Login with Google</strong>
        </div>
    </>);
}
 
export default GoogleProvider;