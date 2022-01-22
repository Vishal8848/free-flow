import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Feed from './routes/Feed'
import Profile from './routes/Profile';

function App() {
  return (
    <Router>

      <Routes>
        
        {/* Home: Default Route */}
        <Route exact path="/" element={<Home/>}/>

        {/* Feed: Posts, Trending and User Interaction */}
        <Route path="/feed" element={<Feed/>} />

        {/* Profile: User, Friends, Actions */}
        <Route path="/profile" element={<Profile/>} />
        
      </Routes>

    </Router>
  );
}

export default App;
