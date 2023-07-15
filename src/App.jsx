import '../src/App.css'
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/common/NavBar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';

const App = () => {
    return (
        <div>
            <NavBar/> 

            <Routes>
                <Route path='/' element={<Home/>}></Route>
                
                <Route path='/signup' element={<Signup/>}></Route>

                <Route path='/login' element={<Login/>}></Route>
                <Route path='/about' element={<About/>}></Route>

                

            
            </Routes>
            
        </div>


    );
};

export default App;