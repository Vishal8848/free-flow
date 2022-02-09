import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useMemo, createContext } from 'react'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'
import Error from './routes/Error'

export const AuthContext = createContext(null);

function App() {

  let access = JSON.parse(window.sessionStorage.getItem('access'));

  if(access == null)  access = JSON.parse(window.localStorage.getItem('access'))

  const [ auth, setAuth ] = useState(access == null ? { status: false, data: null } : { status: true, data: access });

  const Auth = useMemo(() => ({ auth, setAuth }), [ auth, setAuth ]);

  return (
    <Router>
      <AuthContext.Provider value={Auth}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/feed" element={<Feed/>} />
          <Route path="/profile/:uid" element={<Profile />}/>
          <Route path="/error" element={<Error />}/>
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
