// Default
import { useState, useEffect, useContext } from 'react'

// Firebase
import { firebaseUser, firebaseUpdateQuery } from '../../firebase/firebaseStore'
import { onSnapshot } from 'firebase/firestore'

// Imports
import updatesImg from '../../assets/updates.png'
import { Avatar, parseTime } from "../Extras"
import { ThemeContext } from '../../App'

const Update = ({ data }) => {

    const { theme } = useContext(ThemeContext)

    const { date, time, status } = parseTime(data.createdAt);
    let message = "";
    switch(data.type)   {
        case 'post': message = "Created a new wave"; break;
        case 'comment': message = "Added a wavelet"; break;
        default: message = ""
    }

    return (
        <div className={`update mb-2 theme-${theme}-middle shadow-sm`}>
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
    const [ net, setNet ] = useState(true);

    useEffect(() => {
        let unSubUpdates = () => {};
        const Abort = new AbortController();
        if(user.friends.filter(friend => friend !== user.uid).length > 0)   {
            unSubUpdates = onSnapshot(firebaseUpdateQuery(user.friends.filter(friend => friend !== user.uid)), async (data) => {
            
                setNet(true)
                let result = [], unique = [];
    
                data.forEach(update => result.push({ ...update.data() }));
    
                result = result.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt))
                
                unique = result.map(update => update.uid).filter((v, i, a) => a.indexOf(v) === i)
    
                for(const uid of unique)    {
                    const res = await firebaseUser(uid, true);
    
                    if(!res.error)
                        result = result.map(update => update.uid === uid ? { ...update, ...res.data } : { ...update })
                }
    
                setUpdates([...result])
            }, err => setNet(false))
        }
        return () => {
            unSubUpdates()
            Abort.abort()
        }
    }, [user])

    return ( 
        <div className={`updates ${!updates && "pt-3"} animate__animated animate__slideInRight`}>
            {   net ?
                (updates && updates.length > 0) ?
                updates.map(update => (
                    <Update data={update} key={update.createdAt}/>
                )) : 
                <div className="notice text-muted px-5" style={{ borderRadius: "10px", paddingTop: "25px", paddingBottom: "25px" }}>
                    { updatesImg && <img src={updatesImg} alt="Updates" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Wave Updates</strong><br/>
                    Actions made on waves live here
                </div> :
                <div className="notice text-muted px-5" style={{ borderRadius: "10px", paddingTop: "25px", paddingBottom: "25px" }}>
                    { updatesImg && <img src={updatesImg} alt="Updates" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Wave Updates</strong><br/>
                    Check your internet connection and try again
                </div>
            }
        </div>
    );
}
 
export default Updates;