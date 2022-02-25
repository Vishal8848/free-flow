// Default
import { useState, useMemo, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Imports
import { readStoredTheme } from './components/Extras'
import useProfile from './hooks/useProfile'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'

import Cookies from 'universal-cookie'
import Hash from 'object-hash'

const cookies  = new Cookies()

export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);
export const UserContext = createContext(null);

function App() {

  let access = null

  // Reading Cookies
  const commit = cookies.get('commit'), accessKey = cookies.get('access');

  if(commit && accessKey) {
    const privateKey = Hash(commit.split("").reverse().join("") + process.env.REACT_APP_HASH_KEY);

    access = (accessKey === privateKey) ? { uid: commit.split("").reverse().join(""), last: cookies.get('last') ?? null } : null
  }

  const [ theme, setTheme ] = useState(readStoredTheme() ? 'dark' : 'light');

  const Theme = useMemo(() => ({ theme, setTheme }), [ theme, setTheme ])

  const [ auth, setAuth ] = useState(access ? { status: true, data: access } : { status: false, data: null });

  const Auth = useMemo(() => ({ auth, setAuth }), [ auth, setAuth ]);
  
  const User = useProfile(access ? access.uid : null)
  
  return (
    <Router>
      <AuthContext.Provider value={Auth}>
        <UserContext.Provider value={User}>
            <ThemeContext.Provider value={Theme}>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/feed" element={<Feed/>} />
                    <Route path="/profile/:uid" element={<Profile />}/>
                    <Route path="/profile" element={<Navigate to="/profile/default"/>}/>
                    <Route path="/*" element={<Navigate to="/feed" />}/>
                </Routes>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
