import { NavLink } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext';
import { BarSetup } from '../atoms/BarSetup/BarSetup';
import styles from './Navbar.module.css';

export function Navbar() {
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarHeadContainer}>
                    <section className={styles.navbarHead}>
                        <div className={styles.sectionLeft}>
                            <div className={styles.navbarIcon}>     🌊 Waves    </div>
                        </div>
                        <BarSetup />
                        <div className={styles.sectionRight}>
                            <a className={styles.optionLanguage} onClick={() => alert('Funcionalidad no implementada aún')}>
                                <p>Lenguaje</p>
                                <img className={styles.iconLanguage} src={`${useTheme().theme === 'dark' ? '/icons/icon-language.png' : '/icons/icon-language-black.png'}`} width={25} alt="icono de idioma" />
                            </a>
                            <section className={styles.userSection}>
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>Carlos Arango</p>
                                    <p className={styles.userState}>Available</p>
                                </div>
                                <div className={styles.profileSection}>
                                    <img className={styles.profilePicture} src="/icons/icon-user-black.png" alt="Profile" />
                                </div>
                            </section>
                        </div>
                    </section>
                </div>

                <section className={styles.navbarLinks}>
                    <NavLink to="/app/dashboard" 
                        className={({isActive}) => isActive ? `${styles.iconDashboard} ${styles.active}` : styles.iconDashboardBlack}>
                        <img src={`${useTheme().theme === 'dark' ? '/icons/icon-dashboard.png' : '/icons/icon-dashboard-black.png'}`} alt="icono dashboard" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to='microservice' 
                        className={({isActive}) => isActive ? `${styles.iconMicroservice} ${styles.active}` : styles.iconMicroserviceBlack}>
                        <img src={`${useTheme().theme === 'dark' ? '/icons/icon-box.png' : '/icons/icon-box-black.png'}`} alt="icono dashboard" />
                        <p>Microservice</p>
                    </NavLink>
                    <NavLink to='favorites'
                        className={({isActive}) => isActive ? `${styles.iconFavorite} ${styles.active}` : styles.iconFavoriteBlack}>
                        <img src={`${useTheme().theme === 'dark' ? '/icons/icon-heart.png' : '/icons/icon-heart-black.png'}`} alt="icono dashboard" />
                        <p>Favorites</p>
                    </NavLink>
                    <NavLink to='settings'
                        className={({isActive}) => isActive ? `${styles.iconSetting} ${styles.active}` : styles.iconSettingBlack}>
                        <img src={`${useTheme().theme === 'dark' ? '/icons/icon-setting.png' : '/icons/icon-setting-black.png'}`} alt="icono dashboard" />
                        <p>Settings</p>
                    </NavLink>
                </section>
            </nav>
        </>
    )  
}