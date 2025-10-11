import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import ThemeToggle from '../components/atoms/ThemeToggle/ThemeToggle';

export function MainLayout() {
    return(
        <div className="content-app">
            <div className="app">
                <Navbar />
                <main className='container'>
                    <Outlet />
                </main>
                <ThemeToggle/>
            </div>
            <div className='not-available'>
                <h2>Esta aplicación no está disponible en dispositivos móviles. Por favor, accede desde un ordenador.</h2>
            </div>
        </div>
    )
}