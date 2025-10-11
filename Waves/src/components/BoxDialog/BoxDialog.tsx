import styles from './boxDialog.module.css'
import type { BoxDialogProp } from '../../lib/types';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { EndPointForm } from '../EndPointForm/EndPointForm';


export const BoxDialog = ({dialogRef}: BoxDialogProp) => {
    const colorState = {
        purple: styles.active,
        gray: styles.inactive,
        red: styles.error
    }
    const [selectedValue, setSelectedValue] = useState('Active')
    // const [color, setColor] = useState('#7376FF')
    const [claseColor, setClaseColor] = useState(colorState.purple)
    

    const handleSelectChange = (event: any) => {
        const value = event.target.value;
        console.log(value)
        setSelectedValue(value)
        
        value === 'Active'? setClaseColor(colorState.purple) ://('#7376FF') :
        value === 'Inactive' ? setClaseColor(colorState.gray) : setClaseColor(colorState.red)//('#DADADA') : setClaseColor('#FF0040')

    }

    const closeDialog = () => {
        dialogRef.current?.close();
    };
    return (
        
            <dialog ref={dialogRef} className={styles.dialog}>
                <div className={styles.dialogContain}>
                    <header>
                        <h2>Create a Microservice</h2>
                        <button className={styles.btnCloseDialog} onClick={closeDialog}>  
                            <img src={`${useTheme().theme==='dark' ? 'src/assets/icons/icon-close.png' : 'src/assets/icons/icon-close-black.png'}`} alt="close icon" width={20}/>
                        </button>
                    </header>
                    <div>
                        <p>Complete microservice information and his EndPoints</p>
                    </div>

                    <form action="" className={styles.formDialog}>
                        <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                            <label htmlFor="name">Name</label>
                            <input id='name' type="text" autoComplete='false' placeholder='User Authentication Service'/>
                        </div>
                        <div className={`${styles.inputDescriptionDialog} ${styles.inputForm}`}>
                            <label htmlFor="Description">Description</label>
                            <textarea id='Description' placeholder='Describe microservice functionality'/>
                        </div>
                        <div className={styles.containerSelectBox}>
                            <div className={`${styles.inputForm}`}>
                                <label htmlFor="Lenguage">Lenguage</label>
                                <select name="selLenguage" id="Lenguage" className={styles.selectLenguage}>
                                    <option value="Python">Python</option>
                                    <option value="Python">JS</option>
                                    <option value="Python">C#</option>
                                </select>
                            </div>
                            <div className={`${styles.inputForm}`}>
                                <label htmlFor="State">State</label>
                                <select onChange={handleSelectChange} value={selectedValue} name="selState" id="State"  className={`${claseColor} ${styles.selectState}`}>
                                    <option id='Active' value="Active">Active</option>
                                    <option id='Inactive' value="Inactive">Inactive</option>
                                    <option id='Error' value="Error">Error</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.containerInputs}>
                            <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                                <label htmlFor="Urlb">URL base</label>
                                <input id='Urlb' type="text" placeholder='https://api.example.com'/>
                            </div>
                            <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                                <label htmlFor="Version">Versión</label>
                                <input type="text" id='Version' placeholder='1.0.0'/>
                            </div>
                        </div>
                        <div>
                            Aquí va el componente de Tags
                        </div>
                        <div>
                            <EndPointForm/>
                        </div>

                        <div className={styles.containerButton}>
                            <button id='BtnCancel' className={styles.btnCancel}>Cancel</button>
                            <button id='BtnCreate' className={styles.btnCreate}>Create</button>
                        </div>
                    </form>
                </div>
            </dialog>
    )
}