import {BrowserRouter,Route,Routes,} from "react-router-dom"
import './App.css';

import Navbar from './components/nav';
import Welcome from './components/welcome';
import Login from "./components/login";
import AddBook from "./components/addBook";
import Books from "./components/books";
import UserContextProvider from "./context/userContext";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/addbook' element={<AddBook/>}/>
        <Route path='/books' element={<Books/>}/>
      </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
