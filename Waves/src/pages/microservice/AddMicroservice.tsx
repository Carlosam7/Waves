import { useEffect, useRef, useState } from 'react';

import stylesM from './microservice.module.css'
import { BoxDialog } from '../../components/BoxDialog/BoxDialog';
import type { Microservice } from '../../lib/types';
// import { microservice } from '../../hooks/ServiceDb';
// import { useNavigate } from 'react-router-dom';
import { createService } from '../../hooks/createService';

export const AddMicroservice = () => {
    
    // console.log(localStorage.getItem('accessToken'))
    const dialogEdit: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement>(null);
    const openDialog = () => {
        dialogEdit.current?.showModal();
    };
    // console.log('TOKEN: ', localStorage.getItem('accessToken'))

    // const navigate = useNavigate();
    const [ data, setData ] = useState <Omit<Microservice, 'createdAt' | 'updatedAt'>> ({_id: '', routeName: '', url: '', status: 'Active', description: '', language: 'Python', endPoints: [], code: ''})
    const [ activeFunction, setActiveFunction ] = useState(false)

    useEffect(() => {
        if (activeFunction){
            createService(data)
            dialogEdit.current?.close();dialogEdit.current?.close();
            setActiveFunction(false);
            // navigate('/app/microservice', { replace: true });
            // setTimeout(() => window.location.reload(), 100)
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