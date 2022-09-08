import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Postagens from './pages/Postagens';
import Tunel from './pages/Tunel';
import Postar from './pages/Postar';
import { useSelector } from 'react-redux'
import PostarTunel from './pages/PostarTunel';
import SinglePost from './pages/SinglePost';
import SingleTunel from './pages/SingleTunel';
import Contato from './pages/Contato';


function App() {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/postagens' element={<Postagens />} />
        <Route path='/posts/:id' element={<SinglePost />}/>
        <Route path='/tunel/:id' element={<SingleTunel />}/>
        <Route path='/contato' element={<Contato />}/>
        <Route path='/tunel' element={<Tunel />}/>
        <Route path='/postar-tunel' element={<PostarTunel />}/>
        <Route path='/postar' element={currentUser ? <Postar /> : <Home />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
