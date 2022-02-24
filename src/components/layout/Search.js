import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../Extras'
import { firebaseSearchUsers, firebaseMakeRequest, getIndexByValue } from '../../firebase/firebaseStore'
import searchImg from '../../assets/community.png'

const SearchUser = ({ data, request, handleRequest }) => {

    return (
        <div className={`search-user p-2 theme-middle`}>
            <Link to={`/profile/${data.uid.split("").reverse().join("")}`}>
                <Avatar image={data.dp} name={data.name} scale="square-sm" theme={data.theme}/>
            </Link>
            <div className="fs-6 mx-3 w-100">{ data.name }</div>
            {   data.isFriend !== 2 &&
                <button className={`btn btn-${ request === 0 ? 'primary' : 'secondary' } btn-sm`} onClick={() => handleRequest(data.uid)} disabled={ request ? "disabled" : "" }>
                    { request === 0 && <i className="fas fa-plus me-2"></i> }
                    { request === 0 ? "Friend" : "Requested" }
                </button>
            }
        </div>
    );
}

const Search = ({ search, uid, visible, setUserCount }) => {

    const [ users, setUsers ] = useState(null);
    
    const [ SS, setSS ] = useState("");

    useEffect(() => {
        setSS(search)
    }, [search])

    useEffect(() => {
        firebaseSearchUsers(uid).then(res => {
            if(!res.error)  {
                setUsers(res.data)
                if(setUserCount !== null) 
                    setUserCount(res.data.length + 1)
            }
        })
    }, [uid, setUserCount])

    const stringMatch = (n, s) => {
        const Us = s.toUpperCase(), Ls = s.toLowerCase(), Fs = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        return n.includes(s) || n.includes(Us) || n.includes(Ls) || n.includes(Fs)
    }

    const handleRequest = (fid) => {
        console.log(fid);
        firebaseMakeRequest(uid, fid).then(() => {
            const index = getIndexByValue(users, 'uid', fid), updatedUsers = users;
            updatedUsers[index].isFriend = 1;
            setUsers([...updatedUsers])
        })
    }

    return (
        <div className="search p-2 theme-middle shadow" style={{ visibility: visible ? "visible" : "hidden" }}>
            <span className="feed-title ps-3 text-muted fw-bold">Search Results</span>
            {   (users && users.length > 0) ?
                SS.length > 0 ?
                users.filter(user => stringMatch(user.name, SS)).map(user => (
                    <SearchUser data={user} request={user.isFriend} key={user.uid} handleRequest={handleRequest}/>
                )) : 
                <div className="notice text-muted px-5" style={{ borderRadius: "10px", paddingTop: "25px", paddingBottom: "25px" }}>
                    { searchImg && <img src={searchImg} alt="Search" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Search Freeflow</strong><br/>
                    Type something to move mountains
                </div> :
                <div className="notice text-muted px-5" style={{ borderRadius: "10px", paddingTop: "25px", paddingBottom: "25px" }}>
                    { searchImg && <img src={searchImg} alt="Search" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Search Freeflow</strong><br/>
                    Connect with your dearest ones
                </div>
            }
        </div>
    );
}

export default Search;