import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AuthPage from './components/AuthPage/AuthPage';
import ManageCarsPage from './components/ManageCarsPage/ManageCarsPage';
import CarDetailsPage from './components/CarDetails/CarDetailsPage';
import EditCar from './components/Editcar/EditCar';
import OEMSpecsComponent from './components/OEMSpecsComponent/OEMSpecsComponent';
import AddCar from './components/Addcar/AddCar';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ManageCarsPage" element={<ManageCarsPage />} />
        <Route path="/manage/add" element={<EditCar />} />
        <Route path="/manageedit/:Id" element={<EditCar />} />
        <Route path="/car/:id" element={<CarDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/oem-specs/:make/:model"  element={<OEMSpecsComponent />} /> 
      </Routes>
    </div>
  );
}

export default App;
