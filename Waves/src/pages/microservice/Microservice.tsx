import { useEffect, useState } from 'react';

import styles from '../pages.module.css'
import stylesM from './microservice.module.css'
import { MicroserviceCard } from '../../components/MicroserviceCard/MicroserviceCard';
import { AddMicroservice } from './AddMicroservice';
import { microservice } from '../../hooks/ServiceDb';
import type { Microservice } from '../../lib/types';

export function Microservice() {
    const [services, setServices] = useState<Microservice[]>([]);
    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const allServices = await microservice.getAll();
        if(!allServices){
            setServices([])
        }else {
            const data = allServices.data;
            setServices(data)
        }
    }

    return (
        <main className={`${styles.container}`}>
            <AddMicroservice />

            <div className={stylesM.contentCards}>
                { services.length === 0 ? (
                    <p>There are not microservices</p>
                ) : (
                    services.map ((service: Microservice, index) => (
                        <MicroserviceCard
                            key={index}
                            service = {service}
                            // onEdit={microservice.update}
                            onDelete={microservice.delete}
                            onViewEndpoints={()=>{}}
                        />
                    ))
                )}
            </div>
        </main>
    )
}