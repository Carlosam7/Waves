import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './components/atoms/BarSetup/BarSetup';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Microservice } from './pages/microservice/Microservice';
import { LoginRegister } from './components/LoginRegister/LoginRegister';
import { Home } from './pages/Home/Home'
import { PublicLayout } from './layout/PublicLayout';
import { Docs } from './pages/Docs/Docs';
import { Help } from './pages/Help/Help';
import { useAuth } from './context/AuthContext';

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    console.log('isAuthenticated: ', isAuthenticated, 'loading: ', loading);
    if (loading) {
      return <div>loading...</div>;
    }

    if (!isAuthenticated){
      return <Navigate to='/log-in' state={{from: location}} replace />
    }

    // if (isAuthenticated){
    //   // // if (useLocation().pathname === '/log-in' || useLocation().pathname === 'sign-up') {
    //   // //   return <Navigate to='/app'/>
    //   // }

      return <>{children}</>;
    // }

}

function App() {
  return (
    //<PublicLayout />
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<PublicLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='docs' element={<Docs/>}/>
          <Route path='help' element={<Help/>}/>
          <Route path='log-in' element={<LoginRegister typeForm='Log in'/>}/>
          <Route path='sign-up' element={<LoginRegister typeForm='Sign up'/>}/>

          <Route path='*' element={<Navigate to='/' replace/>}/>
        </Route>


        {/* Private routes */}
        <Route path='/app' element = {
          <RequiredAuth>
            <MainLayout />
          </RequiredAuth>
        }>
          <Route index element={<Navigate to = '/app/dashboard'/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="microservice" element={<Microservice />} />
          <Route path="favorites" element={<h1>Favorites</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />

          <Route path='*' element={<Navigate to='/app/dashboard' replace/>}/>

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App


{/* <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="microservice" element={<Microservice />} />
          <Route path="favorites" element={<h1>Favorites</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route> */}