import { firebaseGoogleLogin } from "../modules/firebaseAuth";

const AuthProvider = () => {

    const handleProvider = () => {
        firebaseGoogleLogin()
        .then(data => console.log('Google Login'))
        .catch(err => console.log(err));
    }

    return (<>
        <div className="d-flex my-2 align-items-center justify-content-center">
            <div className="border border-dark" style={{ width: "150px" }}></div>
            <div className="text-dark fw-bold mx-3">OR</div>
            <div className="border border-dark" style={{ width: "150px" }}></div>
        </div>
        <div className="p-2 m-auto rounded-pill border border-3" onClick={() => handleProvider()} style={{ cursor: "pointer", width: "fit-content" }}>
            <i className="fab fa-google fa-lg text-primary me-2"></i> 
            <strong>Login with Google</strong>
        </div>
    </>);
}
 
export default AuthProvider;