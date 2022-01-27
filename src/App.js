import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Feed from './routes/Feed'

function App() {
  return (
    <Router>

      <Routes>
        
        {/* Home: Default Route */}
        <Route exact path="/" element={<Home/>}/>

        {/* Feed: Posts, Trending and User Interaction */}
        <Route path="/feed" element={<Feed/>} />

        {/* Profile: Strict User */}
        <Route exact path="/profile" element={<Profile />}/>

        {/* Profile: Posts, Friends, Saved */}
        <Route path="/profile/:section" element={<Profile/>} />
        
      </Routes>

    </Router>
  );
}

export default App;
