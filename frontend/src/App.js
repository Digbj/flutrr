import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';

import Navbar from './components/nav';
import Welcome from './components/welcome';
import Login from "./components/login";
import AddBook from "./components/addBook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
