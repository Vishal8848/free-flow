const User = () => {

    return ( 
        <div className="user-profile m-auto mt-5 theme-middle">
                <div className="form-floating theme-inner">
                    <input type="text" id="user-occu" name="user-occu" className="form-control border-0" placeholder="What best describes you?"/>
                    <label htmlFor="user-occu">What best describes you?</label>
                    <div className="text-muted ps-2 theme-middle">Eg: Artist, Skater, Gamer, Sportsman...</div>
                </div>

                <div className="form-floating mt-3 theme-inner">
                    <textarea id="user-desc" name="user-desc" maxLength="1000" className="form-control border-0" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px"}}></textarea>
                    <label htmlFor="user-desc">Give an introduction about yourself ...</label>
                </div>
                
                <div className="user-location mt-3">
                    <div className="form-floating me-2 theme-inner">
                        <input type="text" id="user-country" name="user-country" className="form-control border-0" placeholder="Country"/>
                        <label htmlFor="user-country">Country</label>
                    </div>
                    <div className="form-floating mx-2 theme-inner">
                        <input type="text" id="user-state" name="user-state" className="form-control border-0" placeholder="State"/>
                        <label htmlFor="user-state">State</label>
                    </div>
                    <div className="form-floating ms-2 theme-inner">
                        <input type="text" id="user-city" name="user-city" className="form-control border-0" placeholder="City"/>
                        <label htmlFor="user-city">City</label>
                    </div>
                </div>

                <div className="form-floating mt-3 theme-inner">
                    <input type="text" id="user-occu" name="user-occu" className="form-control border-0" placeholder="Education"/>
                    <label htmlFor="user-occu">Education <small className="text-muted">- If any</small></label>
                    <div className="text-muted ps-2 theme-middle">Eg: Delhi Public School</div>
                </div>

                <div className="user-extras theme-middle">    
                    <div className="form-floating mt-3 me-2 theme-inner" style={{ width: "40%" }}>
                        <input type="text" id="dob" name="dob" className="form-control border-0"
                            onFocus={ (e) => e.target.type = "date" } placeholder="00-00-0000" max="2012-12-31"/>
                        <label htmlFor="dob">&nbsp;&nbsp;&nbsp;Date of Birth</label>
                    </div>
                    <div className="form-floating mt-3 ms-2 theme-inner" style={{ width: "60%" }}>
                        <input type="text" id="hobbies" name="hobbies" className="form-control border-0" placeholder="Hobbies"/>
                        <label htmlFor="hobbies">&nbsp;&nbsp;&nbsp;Hobbies <small className="text-muted">- If any</small></label>
                    </div>
                </div>

                <div className="user-save mt-3">
                    <button className="btn btn-success fw-bold"><i className="fas fa-check me-2"></i>Save</button>
                    <button className="btn btn-warning fw-bold"><i className="fas fa-pencil-alt me-2"></i>Edit</button>
                </div>
        </div>
    );
}
 
export default User;