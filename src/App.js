import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { CreateRecipe } from './pages/CreateRecipe';
import { SavedRecipe } from './pages/SavedRecipe';
import { Navbar } from './components/Navbar';

function App() {
  return (
  <>
      <Router>
        <Navbar/>
    <div className="App">
        <Routes>
            <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/createrecipe" element={<CreateRecipe/>} />
          <Route path="/savedrecipe" element={<SavedRecipe/>} />
        </Routes>
    </div>
      </Router>
    </>
  );
} 

export default App;
