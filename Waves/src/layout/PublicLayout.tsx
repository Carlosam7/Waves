import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/atoms/ThemeToggle/ThemeToggle';
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';

export function PublicLayout() {
    return(
        <div className="content-app">
            <div className="app">
                <NavbarPublic/>
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