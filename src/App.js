import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useMemo, createContext } from 'react'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'
import Error from './routes/Error'

export const UserContext = createContext(null);

function App() {

  const [ user, setUser ] = useState({ auth: false, data: null });

  const User = useMemo(() => ({ user, setUser }), [ user, setUser ]);

  return (
    <Router>
      <UserContext.Provider value={User}>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/feed" element={<Feed/>} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/verify" element={<Home />}/>
          <Route path="/error" element={<Error />}/>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
