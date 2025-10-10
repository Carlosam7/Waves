import styles from './BarSetup.module.css';

export function BarSetup() {
    return(
        <div className={styles.barSetup}>
            <img className={styles.iconBarsetup} src="src/assets/icons/icon-engranaje.png" alt="icono de tuerca" />
            <input className={styles.inputBarsetup} type="text" placeholder='Quick Setup'/>
        </div>
    )
}