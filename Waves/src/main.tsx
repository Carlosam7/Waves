import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ThemeProvider>
            <App />
            <Toaster
                position='bottom-right'
                richColors
                expand
                closeButton
            />
        </ThemeProvider>
    </AuthProvider>  
)