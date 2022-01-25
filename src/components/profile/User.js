// fname, lname, location, description, photoURL, bgURL

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
                    <label htmlFor="user-desc" className="text-muted">Give an introduction about yourself ...</label>
                </div>
                
                <div className="user-location row mt-3">
                    <div className="col-md-4">
                        <div className="text-muted ps-2">Country</div>
                        <select name="user-country" id="user-country" className="selectpicker">
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <div className="text-muted ps-2">State</div>
                        <select name="user-state" id="user-state" className="selectpicker">
                            <option value="TN">TN</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <div className="text-muted ps-2">City</div>
                        <select name="user-city" id="user-city" className="selectpicker">
                            <option value="Chennai">Chennai</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default User;