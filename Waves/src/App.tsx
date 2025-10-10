import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/atoms/BarSetup/BarSetup';
// import { BarSetup } from './components/atoms/BarSetup/BarSetup'
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Microservice } from './pages/microservice/Microservice';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="microservice" element={<Microservice />} />
          <Route path="favorites" element={<h1>Favorites</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App