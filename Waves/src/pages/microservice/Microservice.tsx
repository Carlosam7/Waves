import { useEffect, useRef, useState } from 'react';

import styles from '../pages.module.css'
import stylesM from './microservice.module.css'
import { MicroserviceCard } from '../../components/MicroserviceCard/MicroserviceCard';
import type { Microservice } from '../../lib/types';
import { storageService } from '../../lib/storage';
import { BoxDialog } from '../../components/BoxDialog/BoxDialog';

export function Microservice() {
    const [services, setServices] = useState<Microservice[]>([]);
    const dialogEdit: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        storageService.seed();
        loadServices();
    }, []);

    const openDialog = () => {
        dialogEdit.current?.showModal();
    };

    const loadServices = () => {
        const allServices = storageService.getAll();
        setServices(allServices);
    }
    return (
        <>
            <main className={`${styles.container}`}>
                <div className={stylesM.microserviceHeader}>
                    <div>
                        <h2 className={stylesM.titleMicroservice}>Microservices</h2>
                        <p>Create and manage your microservices with Waves, our service platform</p>
                    </div>
                    <div>
                        <button className={stylesM.btnAdd} onClick={openDialog}>
                            <img src="src/assets/icons/icon-plus.png" width={20} alt="" />
                            Add Microservice
                        </button>
                        <input className={stylesM.txtSearch} type="text" placeholder='Search'/>
                        
                    </div>
                </div>


                <div className={stylesM.contentCards}>
                    { services.length === 0 ? (
                        <p>There are not microservices</p>
                    ) : (
                        services.map ((service) => (
                            <MicroserviceCard
                                key={service.id}
                                service = {service}
                                onEdit={()=>{}}
                                onDelete={()=>{}}
                                onViewEndpoints={()=>{}}
                            />
                        ))
                    )}
                </div>
            </main>
            <BoxDialog dialogRef={dialogEdit} />
            
        </>
    )
}