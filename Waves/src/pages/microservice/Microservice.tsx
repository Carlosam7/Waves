import { useEffect, useState } from 'react';

import styles from '../pages.module.css'
import stylesM from './microservice.module.css'
import { MicroserviceCard } from '../../components/MicroserviceCard/MicroserviceCard';
// import { storageService } from '../../lib/storage';
import { AddMicroservice } from './AddMicroservice';
import { microservice } from '../../hooks/ServiceDb';
import type { Microservice } from '../../lib/types';

export function Microservice() {
    const [services, setServices] = useState<Microservice[]>([]);
    // const dialogEdit: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        //storageService.seed();
        loadServices();
    }, []);

    const loadServices = async () => {
        const allServices = await microservice.getAll();
        console.log('Esto es all: ', allServices)
        if(!allServices){
            setServices([])
        }else {
            const data = allServices.data;
            setServices(data)
            console.log('Esto es services. ', services)
        }
    }
    console.log('tamaño: ', services.length)

    return (
            <main className={`${styles.container}`}>
                <AddMicroservice />


                <div className={stylesM.contentCards}>
                    { services.length === 0 ? (
                        <p>There are not microservices</p>
                    ) : (
                        services.map ((service, index) => (
                            <MicroserviceCard
                                key={index}
                                service = {service}
                                onEdit={()=>{}}
                                onDelete={()=>{}}
                                onViewEndpoints={()=>{}}
                            />
                        ))
                    )}
                </div>
                
            </main>
    )
}