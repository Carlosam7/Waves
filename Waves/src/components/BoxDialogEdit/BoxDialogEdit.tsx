import styles from '../BoxDialog/boxDialog.module.css'
import type { BoxDialogEditProp, LenguageType, Microservice, MicroserviceStatus } from '../../lib/types';
import { useTheme } from '../../context/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { EndPointFormEdit } from '../EndPointForm/EndPointFormEdit';

export const BoxDialogEdit = ({ dialogRef, data, setData, activeFunction, setActiveFunction }: BoxDialogEditProp) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const normalizeEndpoints = (endPoints: any) => {
        if (Array.isArray(endPoints)) return endPoints;
        if (typeof endPoints === "object" && endPoints !== null) {
            return Object.entries(endPoints).map(([path, method]) => ({
                path,
                method
            }));
        }
        return [];
    };

    const [service, setService] = useState <Microservice>({...data, endPoints: normalizeEndpoints(data.endPoints)}) 
    const colorState = {
        purple: styles.active,
        gray: styles.inactive,
        red: styles.error
    }
    useEffect(()=> {
        setData(service)

    }, [service])
  
    const [claseColor, setClaseColor] = useState(colorState.purple)
    const [nameFile, setNameFile] = useState('')

    const handleSelectChange = (event: any) => {
        setService(prev => ({ ...prev, status:event.target.value }));
        const value = event.target.value;
        console.log('TOMADLO', value)
        
        value === 'Active'? setClaseColor(colorState.purple) ://('#7376FF') :
        value === 'Inactive' ? setClaseColor(colorState.gray) : setClaseColor(colorState.red)//('#DADADA') : setClaseColor('#FF0040')

    }
    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const file = input.files?.[0];
        if (!file) {
            console.log('No file selected');
            return;
        }
        const fileName = file.name;
        const extension = fileName.split('.').pop()?.toLowerCase();
        const language = (extension === 'js' ? 'JS' : extension === 'py' ? 'Python' : 'C#') as LenguageType;
        setNameFile(fileName);

        const reader = new FileReader();
        reader.onload = (event) => {
            const code = event.target?.result as string;
            console.log('file content length:', code?.length);
            setService(prev => ({ ...prev, code, language }));
            setData(prev => ({ ...prev, code, language }));
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.onerror = (err) => {
            console.error('FileReader error', err);
        };
        reader.readAsText(file);
    };

    const activeFunctionCreateMicroservice = () => {
        if(!service.routeName || !service.description || !service.endPoints || !service.code) {
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
                    <h2>Edit Microservice</h2>
                    <button className={styles.btnCloseDialog} onClick={closeDialog}>  
                        <img src={`${useTheme().theme==='dark' ? '/icons/icon-close.png' : '/icons/icon-close-black.png'}`} alt="close icon" width={20}/>
                    </button>
                </header>
                <div>
                    <p>Edit microservice information and his EndPoints</p>
                </div>

                <form action="" className={styles.formDialog}>
                    <div className={`${styles.inputDialog} ${styles.inputForm}`}>
                        <label htmlFor="name">Name</label>
                        <input required id='name' name='name' type="text" autoComplete='false' placeholder='User Authentication Service' 
                            value={service.routeName} 
                            onChange={(e) => {setService(prev => ({...prev, routeName:e.target.value}))}}
                        />
                    </div>
                    <div className={`${styles.inputDescriptionDialog} ${styles.inputForm}`}>
                        <label htmlFor="Description">Description</label>
                        <textarea required id='Description' name='description' placeholder='Describe microservice functionality'
                            value={service.description} 
                            onChange={(e) => {setService(prev => ({...prev, description:e.target.value}))}}
                        />
                    </div>
                    <div className={styles.containerSelectBox}>
                        <div className={`${styles.inputForm}`}>
                            <label htmlFor="Lenguage">Lenguage</label>
                            <select disabled={true} required name="lenguage" id="Lenguage" className={styles.selectLenguage} 
                                value={service.language} 
                                onChange={(e) => {setService(prev => ({...prev, lenguage:e.target.value as LenguageType}))}}
                            >
                                <option value="Python">Python</option>
                                <option value="JS">JS</option>
                                <option value="C#">C#</option>
                            </select>
                        </div>
                        <div className={`${styles.inputForm}`}>
                            <label htmlFor="State">State</label>
                            <select required onChange={(e) => {handleSelectChange(e); setService(prev => ({...prev, status: e.target.value as MicroserviceStatus}))}} 
                                value={service.status} name="status" id="State"  className={`${claseColor} ${styles.selectState}`}>
                                <option id='Active' value="Active">Active</option>
                                <option id='Inactive' value="Inactive">Inactive</option>
                                <option id='Error' value="Error">Error</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        Aquí va el componente de Tags
                    </div>
                    <div>
                        <EndPointFormEdit data={service} setData={setService}/>
                    </div>
                    <div className={styles.containerCode}>
                        <label htmlFor="codeEdit">Subir codigo</label>
                        <input key={service.routeName} id='codeEdit' type="file" accept='.py, .js, .cs'
                            onChange={handleFileChange}
                        />
                        <p>{nameFile}</p>
                    </div>
                    <div className={styles.containerButton}>
                        <button id='BtnCancel' className={styles.btnCancel}>Cancel</button>
                        <button type='button' onClick={activeFunctionCreateMicroservice} id='BtnCreate' className={styles.btnCreate}>Edit</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}