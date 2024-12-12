import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import SignUp from './components/signup'
import Home from './components/home'
import CarDetails from './components/car-details'
import AddCar from './components/add-car.jsx'
import Saves from './components/saves.jsx'
import MyPostings from './components/my-postings.jsx'
import EditCar from './components/edit-car.jsx'
import './stylesheets/App.css';  
import './stylesheets/navbar.css';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/car/:id' element={<CarDetails />}></Route>
          <Route path='/addCar' element={<AddCar/>}></Route>
          <Route path='/saves' element={<Saves/>}></Route>
          <Route path='/myPostings' element={<MyPostings/>}></Route>
          <Route path='/editCarPage/:id' element={<EditCar/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
