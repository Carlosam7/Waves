import { useEffect, useState } from 'react';
import type { FormType } from '../../lib/types';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './NavbarPublic.module.css';

export const NavbarPublic = () => {
    const [type, setType] = useState<FormType | null > (null)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname === '/log-in') {
            setType('Sign up')
        }else {
            setType('Log in')
        }

    }, [location])

    // if (location.pathname === '/sign-up') {
    //     setType('Log in')
    // }else {
    //     setType('Sign up')
    // }
    

    return (
        <div className={styles.navbarP}>
            <div className={styles.options}>
                <NavLink className={styles.option} to={'/'}>Home</NavLink>
                <NavLink className={styles.option} to={'/Docs'}>Docs</NavLink>
                <NavLink className={styles.option} to={'/Help'}>Help</NavLink>
                <NavLink className={styles.btnAction} to={`${location.pathname==='/log-in' ? '/sign-up': '/log-in'}`}>{type}</NavLink>
            </div>
        </div>
    )
}