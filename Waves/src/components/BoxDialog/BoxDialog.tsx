import styles from './boxDialog.module.css'
import type { BoxDialogProp, LenguageType, MicroserviceStatus } from '../../lib/types';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import { EndPointForm } from '../EndPointForm/EndPointForm';


export const BoxDialog = ({ dialogRef, data, setData, activeFunction, setActiveFunction }: BoxDialogProp) => {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const code = event.target?.result as string;
            setData({ ...data, code }); // Guardas el código en tu estado "data"
            console.log('ESTE ES EL CÓDIGOOO', code)
        };
        reader.readAsText(file);
    };


    const activeFunctionCreateMicroservice = () => {
        if(!data.name || !data.description || !data.image || !data.baseUrl || !data.endpoints) {
            alert("Por favor, completa todos los campos")
            return
        }
        if (!activeFunction){
            setActiveFunction(true);
        }
    }
    return (
        
            <dialog ref={dialogRef} className={styles.dialog}>
                <div className={styles.dialogContain}>
                    <header>
                        <h2>Create a Microservice</h2>
                        <button className={styles.btnCloseDialog} onClick={closeDialog}>  
                            <img src={`${useTheme().theme==='dark' ? '/icons/icon-close.png' : '/icons/icon-close-black.png'}`} alt="close icon" width={20}/>
                        </button>
                    </header>
                    <div>
                        <p>Complete microservice information and his EndPoints</p>
                    </div>

                    <form action="" className={styles.formDialog}>
                        <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                            <label htmlFor="name">Name</label>
                            <input required id='name' name='name' type="text" autoComplete='false' placeholder='User Authentication Service' 
                                value={data.name} 
                                onChange={(e) => {setData(prev => ({...prev, name:e.target.value}))}}
                            />
                        </div>
                        <div className={`${styles.inputDescriptionDialog} ${styles.inputForm}`}>
                            <label htmlFor="Description">Description</label>
                            <textarea required id='Description' name='description' placeholder='Describe microservice functionality'
                                value={data.description} 
                                onChange={(e) => {setData(prev => ({...prev, description:e.target.value}))}}
                            />
                        </div>
                        <div className={styles.containerSelectBox}>
                            <div className={`${styles.inputForm}`}>
                                <label htmlFor="Lenguage">Lenguage</label>
                                <select disabled={true} required name="lenguage" id="Lenguage" className={styles.selectLenguage} 
                                    value={data.language} 
                                    onChange={(e) => {setData(prev => ({...prev, lenguage:e.target.value as LenguageType}))}}
                                >
                                    <option value="Python">Python</option>
                                    <option value="JS">JS</option>
                                    <option value="C#">C#</option>
                                </select>
                            </div>
                            <div className={`${styles.inputForm}`}>
                                <label htmlFor="State">State</label>
                                <select required onChange={(e) => {handleSelectChange(e); setData(prev => ({...prev, status: e.target.value as MicroserviceStatus}))}} 
                                    value={selectedValue} name="status" id="State"  className={`${claseColor} ${styles.selectState}`}>
                                    <option id='Active' value="Active">Active</option>
                                    <option id='Inactive' value="Inactive">Inactive</option>
                                    <option id='Error' value="Error">Error</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.containerInputs}>
                            <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                                <label htmlFor="Urlb">URL base</label>
                                <input required id='Urlb' name='baseUrl' type="text" placeholder='https://api.example.com'
                                    value={data.baseUrl} 
                                    onChange={(e) => {setData(prev => ({...prev, baseUrl:e.target.value}))}}
                                />
                            </div>
                            <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                                <label htmlFor="Version">Versión</label>
                                <input required type="text" name='image' id='Image' placeholder='1.0.0'
                                    value={data.image} 
                                    onChange={(e) => {setData(prev => ({...prev, image:e.target.value}))}}
                                />
                            </div>
                        </div>
                        <div>
                            Aquí va el componente de Tags
                        </div>
                        <div>
                            <EndPointForm data={data} setData={setData}/>
                        </div>
                        <div className={styles.containerCode}>
                            <label htmlFor="submitCode">Subir codigo</label>
                            <input id='submitCode' type="file" accept='.py, .js, .cs'
                                onChange={(e) => handleFileChange(e)}
                            />
                        </div>

                        <div className={styles.containerButton}>
                            <button id='BtnCancel' className={styles.btnCancel}>Cancel</button>
                            <button type='button' onClick={activeFunctionCreateMicroservice} id='BtnCreate' className={styles.btnCreate}>Create</button>
                        </div>
                    </form>
                </div>
            </dialog>
    )
}