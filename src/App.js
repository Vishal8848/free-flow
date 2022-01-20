import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

        {/* Profile: User, Friends, Actions */}
        <Route path="/profile" element={<Feed/>} />
        
      </Routes>

    </Router>
  );
}

export default App;
