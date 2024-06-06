import Ogr from './Components/Ogr/ogr.js';
import './App.css';
import Login from './Components/login/login.js';
import Teacher from './Components/teacher/teacher.js';
import Idareci from './Components/idareci/idareci.js';
import Danisman from './Components/danisman/danisman.js';
import Notlar from './Components/Ogr/notlar.js';
import Kayitgonder from './Components/Ogr/kayitgonder.js';
import Notgir from './Components/teacher/notgir.js';
import Dersata from './Components/idareci/dersata.js';
import Dersonayla from './Components/danisman/dersonayla.js';
import { BrowserRouter , Routes , Route } from  "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Danisman' element={<Danisman/>}/>
        <Route path='/Kayitgonder' element={<Kayitgonder/>}/>
        <Route path='/Notgir' element={<Notgir/>}/>
        <Route path='/Dersata' element={<Dersata/>}/>
        <Route path='/Teacher' element={<Teacher/>}/>
        <Route path='/Ogr' element={<Ogr/>}/>
        <Route path='/Idareci' element={<Idareci/>}/>
        <Route path='/Notlar' element={<Notlar/>}/>
        <Route path='/Dersonayla' element={<Dersonayla/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
