import { useState, useEffect } from 'react'
import { cast, getIndexByValue, firebaseUser, firebaseUpdateQuery } from '../../firebase/firebaseStore';
import { onSnapshot } from 'firebase/firestore'

import { Avatar, parseTime } from "../Extras";

const Update = ({ data }) => {

    const { date, time, status } = parseTime(data.createdAt);
    let message = "";
    switch(data.type)   {
        case 'post': message = "Created a new wave"; break;
        case 'comment': message = "Added a wavelet"; break;
        default: message = ""
    }

    return (
        <div className="update mb-2 theme-inner shadow-sm">
            <div className="update-by">
                <Avatar image={data.dp} name={data.name} scale="md" theme={data.theme}/>
                <div className="u-content px-3">
                    <div className="u-head">
                        <div className="u-creator">
                            { data.name.length > 15 ? data.name.split(' ')[0].length > 15 ? data.name.substring(0, 10) + ' ...' : data.name.split(' ')[0] : data.name}
                        </div>
                        <div className="u-time text-muted">
                            { data.name.length < 10 && time }
                            { data.name.length < 10 && <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> }
                            { status !== "" ? status : date }
                        </div>
                    </div>
                    <div className="u-body text-muted">
                        { message }
                    </div>
                </div>
            </div>
        </div>
    );
}

const Updates = ({user}) => {

    const [ updates, setUpdates ] = useState(null);

    useEffect(() => {
        console.log("Updates")
        const Abort = new AbortController();
        const unSubUpdates = onSnapshot(firebaseUpdateQuery(user.friends), async (data) => {
            let result = [];
            data.forEach(update => result.push({ ...update.data() }));
            
            result = result.filter(update => update.uid !== user.uid)
            for(const update of result) {
                const res = await firebaseUser(update.uid, true);
                const index = getIndexByValue(result, 'createdAt', update.createdAt);
                if(!res.error) 
                    result[index] = { ...result[index], ...res.data }
            }
            setUpdates([...result])
        }, err => console.log(cast(err.message)))
        return () => {
            unSubUpdates()
            Abort.abort()
        }
    }, [user])

    return ( 
        <div className="updates">
            {   (updates && updates.length > 0) ?
                updates.map(update => (
                    <Update data={update} key={update.createdAt}/>
                )) : 
                <div className="update-notice text-muted px-5">
                    <strong>Wave Notifications</strong><br/>
                    All actions made on your waves live here
                </div>
            }
        </div>
    );
}
 
export default Updates;