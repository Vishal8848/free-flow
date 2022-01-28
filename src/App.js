import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/feed" element={<Feed/>} />
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;
