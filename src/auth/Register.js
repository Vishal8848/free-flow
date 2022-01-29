import Loader from '../components/Loader'

const Register = ({ shiftAuth }) => {
    return ( 
        <div className="register-form text-center rounded bg-light p-3 shadow">
            <form className="form-floating">
                
                <div className="row mb-3">
                    
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" id="fname" name="fname" placeholder="Roberto" className="form-control"/>
                        <label htmlFor="fname">&nbsp;&nbsp;&nbsp;First Name</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>
                    
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" id="lname" name="lname" placeholder="Carlos" className="form-control"/>
                        <label htmlFor="lname">&nbsp;&nbsp;&nbsp;Last Name</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>

                </div>

                <div className="row mb-3">
                    
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="text" id="dob" name="dob" className="form-control"
                            onFocus={ (e) => e.target.type = "date" } placeholder="00-00-0000" max="2021-12-31"/>
                        <label htmlFor="dob">&nbsp;&nbsp;&nbsp;Date of Birth</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>

                    <div id="gender-drop" className="col-md-6">
                        <select id="gender" style={{ height: "55px" }} className="form-select">
                            <option value="" selected disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>

                </div>
                
                <div className="row mb-3">
                
                    <div className="form-floating" style={{ width: "400px" }}>
                        <input type="email" id="email" name="email" className="form-control"/>
                        <label htmlFor="email">&nbsp;&nbsp;&nbsp;Email Address</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>
                
                </div>

                <div className="row mb-3">
                
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="password" id="passwd" name="passwd" className="form-control"/>
                        <label htmlFor="passwd">&nbsp;&nbsp;&nbsp;Password</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>
                
                    <div className="col-md-6 form-floating" style={{ width: "200px" }}>
                        <input type="password" id="cpasswd" name="cpasswd" className="form-control"/>
                        <label htmlFor="cpasswd">&nbsp;&nbsp;&nbsp;Confirm</label>
                        <div className="text-start fw-bold ps-2 text-danger"></div>
                    </div>
                
                </div>
                
                <div className="text-muted text-start" style={{ fontSize: "12.5px", width: "375px" }}>
                    Password must be minimum 8 characters with atleast one lowercase, uppercase, number and special character.
                </div>

                <input type="submit" className="btn btn-primary mt-2 px-3 py-2 w-100 fs-5" value="Sign Up"/>
            </form>

            <div className="d-flex my-2 align-items-center justify-content-center">
                <div className="fw-bold">Already a User ?&nbsp;</div>
                <div className="text-primary fw-bold" style={{ cursor: "pointer" }}
                    onClick={() => shiftAuth(0)}> Sign In </div>
            </div>

            <Loader show={false}/>
        </div>
    );
}
 
export default Register;