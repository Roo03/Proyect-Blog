import './App.css';
import Login from './Components/Login/Login';
import Main from "./Components/Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import { AuthProvider } from "./Components/context/authContext";
import Profile from './Components/perfil/Perfil';
import Post from './Components/Post/Post';
import Share from './Components/Compartir/Compartir';

function App() {
  return (
    <AuthProvider>
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path="/Post" element={<Post />} />
          <Route path='/Share' element={<Share />} />
        </Routes>
      </main>
    </Router>
    </AuthProvider>
  );
}

export default App;
