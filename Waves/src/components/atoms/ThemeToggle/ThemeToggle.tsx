import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import styles from './themeToggle.module.css'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [rotating, setRotating] = useState(false);

    const handleClick = () => {
        if (rotating) return 
        setRotating(true)
        setTimeout(() => {
            setRotating(false);
        }, 300);
        toggleTheme();
    }

    console.log(theme)
    return (
        <>
        <button onClick={()=>{handleClick()}} className={`${styles.transition} ${rotating ? styles.rotating : ''}`}>
            <img src={`${theme === 'dark' ?  'https://img.icons8.com/?size=100&id=9313&format=png&color=FFFFFF' : 'https://img.icons8.com/?size=100&id=nN5C0TpPous6&format=png&color=000000'}`} 
                alt="Icono de luna o sol" width={30}/>
        </button>
        </>
    )
}