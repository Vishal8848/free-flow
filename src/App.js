import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useMemo, createContext } from 'react'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'
import Error from './routes/Error'

export const UserContext = createContext(null);

function App() {

  const access = JSON.parse(window.localStorage.getItem('access'));

  const [ user, setUser ] = useState(access == null ? { auth: false, data: null } : { auth: true, data: access });

  const User = useMemo(() => ({ user, setUser }), [ user, setUser ]);

  return (
    <Router>
      <UserContext.Provider value={User}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/feed" element={<Feed/>} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/error" element={<Error />}/>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
