import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'
import type { Theme, ThemeContextType } from '../lib/types';

const ThemeContext = createContext<ThemeContextType | undefined > (undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
            document.body.classList.toggle("dark", storedTheme==='dark');
            // document.documentElement.setAttribute("data-theme", storedTheme)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.classList.toggle("dark", theme==='dark');
        // document.documentElement.setAttribute("data-theme", theme)
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be in ThemeProvider');
    return context;
}