import { useState } from "react"
import { firebaseUser, firebaseUpdateUser } from "../../firebase/firebaseStore";

const User = ({ auth, data, updateProfile }) => {

    const [ user, setUser ] = useState(data);

    const updateField = (key, value) => {
        let fields = user;
        key.includes('.') ? fields[key.split('.')[0]][key.split('.')[1]] = value : fields[key] = value
        setUser({...fields})
    }

    const updateUser = () => {
        let cred = user;
        delete cred.uid;
        firebaseUpdateUser(data.uid, cred).then(res => {
            firebaseUser(auth.uid).then(res => {
                if(res.error)   console.log(res.data);
                else updateProfile(res.data)
            })
        })
    }

    return ( 
        <div className="user-profile m-auto mt-5 theme-middle">
            <div className="form-floating theme-inner">
                <input type="text" id="user-occu" name="user-occu" className="form-control border-0" placeholder="What best describes you?"
                    value={user.occupation} onChange={(e) => updateField('occupation', e.target.value)} disabled={auth.uid === data.uid ? "" : "disabled"}/>
                <label htmlFor="user-occu">What best describes you?</label>
                <div className="text-muted ps-2 mt-1 theme-middle">Eg: Artist, Skater, Gamer, Sportsman...</div>
            </div>

            <div className="form-floating mt-3 theme-inner">
                <textarea id="user-desc" name="user-desc" maxLength="1000" className="form-control border-0" placeholder="Write down your thoughts" style={{ minHeight: "100px", maxHeight: "200px"}}
                    value={user.description} onChange={(e) => updateField('description', e.target.value)} disabled={auth.uid === data.uid ? "" : "disabled"}></textarea>
                <label htmlFor="user-desc">Give an introduction about yourself ...</label>
            </div>
            
            <div className="user-location mt-3">
                <div className="form-floating me-2 theme-inner">
                    <input type="text" id="user-country" name="user-country" className="form-control border-0" placeholder="Country" disabled={auth.uid === data.uid ? "" : "disabled"}
                        value={user.location.country} onChange={(e) => updateField('location.country', e.target.value)}/>
                    <label htmlFor="user-country">Country</label>
                </div>
                <div className="form-floating mx-2 theme-inner">
                    <input type="text" id="user-state" name="user-state" className="form-control border-0" placeholder="State" disabled={auth.uid === data.uid ? "" : "disabled"}
                        value={user.location.state} onChange={(e) => updateField('location.state', e.target.value)}/>
                    <label htmlFor="user-state">State</label>
                </div>
                <div className="form-floating ms-2 theme-inner">
                    <input type="text" id="user-city" name="user-city" className="form-control border-0" placeholder="City" disabled={auth.uid === data.uid ? "" : "disabled"}
                        value={user.location.city} onChange={(e) => updateField('location.city', e.target.value)}/>
                    <label htmlFor="user-city">City</label>
                </div>
            </div>

            <div className="form-floating mt-3 theme-inner">
                <input type="text" id="user-edu" name="user-edu" className="form-control border-0" placeholder="Education"
                    value={user.education} onChange={(e) => updateField('education', e.target.value)} disabled={auth.uid === data.uid ? "" : "disabled"}/>
                <label htmlFor="user-edu">Education <small className="text-muted">- If any</small></label>
                <div className="text-muted ps-2 mt-1 theme-middle">Eg: Delhi Public School</div>
            </div>

            <div className="user-extras theme-middle">    
                <div className="form-floating mt-3 me-2 theme-inner" style={{ width: "40%" }}>
                    <input type="text" id="dob" name="dob" className="form-control border-0"
                        onFocus={ (e) => e.target.type = "date" } placeholder="00-00-0000" max="2012-12-31"
                        value={user.dob} onChange={(e) => updateField('dob', e.target.value)} disabled={auth.uid === data.uid ? "" : "disabled"}/>
                    <label htmlFor="dob">Date of Birth</label>
                </div>
                <div className="form-floating mt-3 ms-2 theme-inner" style={{ width: "60%" }}>
                    <input type="text" id="hobbies" name="hobbies" className="form-control border-0" placeholder="Hobbies"
                        value={user.hobbies} onChange={(e) => updateField('hobbies', e.target.value)} disabled={auth.uid === data.uid ? "" : "disabled"}/>
                    <label htmlFor="hobbies">Hobbies <small className="text-muted">- If any</small></label>
                </div>
            </div>

            {   (auth.uid === data.uid) &&
                <div className="user-save mt-3">
                    <button className="btn btn-success fw-bold" onClick={() => updateUser()}>
                        <i className="fas fa-check me-2"></i>Save
                    </button>
                </div>
            }
        </div>
    );
}
 
export default User;