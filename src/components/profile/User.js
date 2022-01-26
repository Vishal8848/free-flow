// fname, lname, location, description, photoURL, bgURL

const User = () => {
    return ( 
        <div className="user-profile m-auto">
            <div className="user-basic mt-5">

                {/* User Occupation */}
                <div className="form-floating">
                    <input type="text" id="user-occu" name="user-occu" className="form-control" placeholder="What best describes you?"/>
                    <label htmlFor="user-occu">What best describes you?</label>
                    <div className="text-muted ps-2">Eg: Artist, Skater, Gamer, Sportsman...</div>
                </div>

                {/* User DOB */}
                <div className="user-dob row">
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">Day</div>
                        <select name="user-day" id="user-day" className="form-select">
                            <option value="25">25</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">Month</div>
                        <select name="user-month" id="user-month" className="form-select">
                            <option value="July">July</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">Year</div>
                        <select name="user-year" id="user-year" className="form-select">
                            <option value="2001">2001</option>
                        </select>
                    </div>
                </div>

                {/* User Description */}
                <div className="form-floating mt-3">
                    <textarea id="user-desc" name="user-desc" maxLength="1000" className="form-control" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px"}}></textarea>
                    <label htmlFor="user-desc">Give an introduction about yourself ...</label>
                </div>
                
                {/* User Location */}
                <div className="user-location row">
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">Country</div>
                        <select name="user-country" id="user-country" className="form-select">
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">State</div>
                        <select name="user-state" id="user-state" className="form-select">
                            <option value="TN">TN</option>
                        </select>
                    </div>
                    <div className="col-md-4 mt-3">
                        <div className="text-muted ps-2">City</div>
                        <select name="user-city" id="user-city" className="form-select">
                            <option value="Chennai">Chennai</option>
                        </select>
                    </div>
                </div>

                {/* User Education */}
                <div className="form-floating mt-3">
                    <input type="text" id="user-occu" name="user-occu" className="form-control" placeholder="Education"/>
                    <label htmlFor="user-occu">Education <small className="text-muted">- If any</small></label>
                    <div className="text-muted ps-2">Eg: Delhi Public School</div>
                </div>

                {/* User Update Options */}
                <div className="user-save mt-3">
                    <button className="btn btn-success fw-bold"><i className="fas fa-check me-2"></i>Save</button>
                    <button className="btn btn-warning fw-bold"><i className="fas fa-pencil-alt me-2"></i>Edit</button>
                </div>

            </div>
        </div>
    );
}
 
export default User;