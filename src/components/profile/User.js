const User = () => {

    return ( 
        <div className="user-profile m-auto">
            <div className="user-basic mt-5">

                <div className="form-floating">
                    <input type="text" id="user-occu" name="user-occu" className="form-control" placeholder="What best describes you?"/>
                    <label htmlFor="user-occu">What best describes you?</label>
                    <div className="text-muted ps-2">Eg: Artist, Skater, Gamer, Sportsman...</div>
                </div>

                <div className="form-floating mt-3">
                    <textarea id="user-desc" name="user-desc" maxLength="1000" className="form-control" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px"}}></textarea>
                    <label htmlFor="user-desc">Give an introduction about yourself ...</label>
                </div>
                
                <div className="user-location mt-3">
                    <div className="form-floating me-2">
                        <input type="text" id="user-country" name="user-country" className="form-control" placeholder="Country"/>
                        <label htmlFor="user-country">Country</label>
                    </div>
                    <div className="form-floating mx-2">
                        <input type="text" id="user-state" name="user-state" className="form-control" placeholder="State"/>
                        <label htmlFor="user-state">State</label>
                    </div>
                    <div className="form-floating ms-2">
                        <input type="text" id="user-city" name="user-city" className="form-control" placeholder="City"/>
                        <label htmlFor="user-city">City</label>
                    </div>
                </div>

                <div className="form-floating mt-3">
                    <input type="text" id="user-occu" name="user-occu" className="form-control" placeholder="Education"/>
                    <label htmlFor="user-occu">Education <small className="text-muted">- If any</small></label>
                    <div className="text-muted ps-2">Eg: Delhi Public School</div>
                </div>

                <div className="user-extras row">    
                    <div className="col-md-3 form-floating mt-3">
                        <input type="text" id="dob" name="dob" className="form-control"
                            onFocus={ (e) => e.target.type = "date" } placeholder="00-00-0000" max="2012-12-31"/>
                        <label htmlFor="dob">&nbsp;&nbsp;&nbsp;Date of Birth</label>
                    </div>
                    <div className="col-md-9 form-floating mt-3">
                        <input type="text" id="hobbies" name="hobbies" className="form-control" placeholder="Hobbies"/>
                        <label htmlFor="hobbies">&nbsp;&nbsp;&nbsp;Hobbies <small className="text-muted">- If any</small></label>
                    </div>
                </div>

                <div className="user-save mt-3">
                    <button className="btn btn-success fw-bold"><i className="fas fa-check me-2"></i>Save</button>
                    <button className="btn btn-warning fw-bold"><i className="fas fa-pencil-alt me-2"></i>Edit</button>
                </div>

            </div>
        </div>
    );
}
 
export default User;