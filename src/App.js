import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useMemo, createContext } from 'react'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'
import Error from './routes/Error'
import useProfile from './hooks/useProfile'

export const AuthContext = createContext(null);
export const UserContext = createContext(null);

function App() {

  let access = JSON.parse(window.sessionStorage.getItem('access'));

  if(access == null)  access = JSON.parse(window.localStorage.getItem('access'))

  const [ auth, setAuth ] = useState(access == null ? { status: false, data: null } : { status: true, data: access });

  const Auth = useMemo(() => ({ auth, setAuth }), [ auth, setAuth ]);
  
  const user = useProfile(access.uid)
  
  return (
    <Router>
      <AuthContext.Provider value={Auth}>
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          
            <Route path="/feed" element={<Feed/>} />
            <Route path="/profile/:uid" element={<Profile />}/>
            <Route path="/error" element={<Error />}/>
        </Routes>
          </UserContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
