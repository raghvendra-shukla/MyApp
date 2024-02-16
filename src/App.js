// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Cart from './Components/Cart';
import { useState } from 'react';
import Alert from './Components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
  }
  return (
    <>
    <Router>
      <Navbar showAlert={showAlert}/>
    <Routes>
    <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
    <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
    <Route path="/cart" element={<Cart showAlert={showAlert}/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
