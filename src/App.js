import logo from './logo.svg';
import './App.css';
import{BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom'

import Admin from './components/Admin';
import Editpage from './components/edit';
import Add from './components/add';
import Home from './components/home';
import Orders from './components/orders';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Admin' element={<Admin/>}></Route>
          <Route path='/edit' element={<Editpage/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route exact path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
