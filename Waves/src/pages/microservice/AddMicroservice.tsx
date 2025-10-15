import { useEffect, useRef, useState } from 'react';

import stylesM from './microservice.module.css'
import { BoxDialog } from '../../components/BoxDialog/BoxDialog';
import type { Microservice } from '../../lib/types';
// import { microservice } from '../../hooks/ServiceDb';
import { useNavigate } from 'react-router-dom';
import { createService } from '../../hooks/createService';

export const AddMicroservice = () => {
    
    // console.log(localStorage.getItem('accessToken'))
    const dialogEdit: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement>(null);
    const openDialog = () => {
        dialogEdit.current?.showModal();
    };
    // console.log('TOKEN: ', localStorage.getItem('accessToken'))

    const navigate = useNavigate();
    const [ data, setData ] = useState <Omit<Microservice, 'createdAt' | 'updatedAt'>> ({_id: '', routeName: '', url: '', status: 'Active', description: '', language: 'Python', endPoints: [], code: ''})
    const [ activeFunction, setActiveFunction ] = useState(false)

    
    // const createService = async () => {
    //     const endpoints = data.endpoints;
    //     let dictEndpoints: Record<string, string> = {}
    //     if(endpoints.length > 0){
    //         for (const item of data.endpoints){
    //             dictEndpoints[item.method] = item.path
    //         }
    //     }
    //     const dataParse: Omit<MicroserviceToSend, 'createdAt' | 'updatedAt'> = {
    //         name: data.name,
    //         description: data.description,
    //         language: data.language,
    //         status: data.status,
    //         baseUrl: data.baseUrl,
    //         image: data.image,
    //         endpoints: dictEndpoints,
    //         code: data.code
    //     }
    //     console.log('Esto es lo que envio: ',dataParse)
    //     try {
    //         const response = await microservice.deploy(dataParse);
    //         if (!response.success){
    //             alert(response.error)
    //         }else {
    //             alert('Microservicio creado con éxito');
    //             dialogEdit.current?.close();
    //             //navigate('/app/microservice', { replace: true });
    //             //setTimeout(() => window.location.reload(), 100)
    //         }
    //     }catch (error) {
    //         console.error('Creation failed. ', error)
    //     }
    // }
    // console.log('from fastapi import FastAPI\r\n\r\n# Crear la aplicación FastAPI\r\napp = FastAPI()\r\n\r\n# Definir una ruta\r\n@app.get(\"/\")\r\ndef read_root():\r\n    return {\"mensaje\": \"¡Hola, mundo!\"}\r\n\r\n# Otra ruta opcional\r\n@app.get(\"/saludo/{nombre}\")\r\ndef saludar(nombre: str):\r\n    return {\"mensaje\": f\"¡Hola, {nombre}!\"}')
    useEffect(() => {
        if (activeFunction){
            createService(data)
            dialogEdit.current?.close();dialogEdit.current?.close();
            setActiveFunction(false)
        }
    }, [activeFunction])
    // console.log('Esta es la data: ', data)

    return (
        <>
            <div className={stylesM.microserviceHeader}>
                <div>
                    <h2 className={stylesM.titleMicroservice}>Microservices</h2>
                    <p>Create and manage your microservices with Waves, our service platform</p>
                </div>
                <div>
                    <button className={stylesM.btnAdd} onClick={openDialog}>
                        <img src="/icons/icon-plus.png" width={20} alt="" />
                        Add Microservice
                    </button>
                    <input className={stylesM.txtSearch} type="text" placeholder='Search'/>
                </div>
            </div>
            <BoxDialog dialogRef={dialogEdit} data={data} setData={setData} activeFunction={activeFunction} setActiveFunction={setActiveFunction}/>
        </>
    )
}