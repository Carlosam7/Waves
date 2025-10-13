import type { Microservice } from "../lib/types";
const MICROSERVICES_KEY = 'microservices';

export const getDataTable = async (nameTable:string) => {
    try{
        const response = await fetch(`http://localhost:3000/db/read/${nameTable}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                params: {
                    tableName: nameTable
                },
                accessToken: localStorage.getItem('accessToken')
            })
        })
        console.log('QUÉ DIJO', response)
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error al obtener datos', errorData);
            return {
                success: false,
                data: errorData.data,
                error: errorData.message
            }
        }
        
        if (response.ok) {
            const data = await response.json();
            console.log('Datos obtenidos exitosamente: ', data)
            return {
                success: true,
                data: data.data,
                error: null
            }
        }
    } catch (error:any) {
        console.error('Unexpected error ', error);
        //throw new Error('Get data failed', error.message)
        return {
            success: false,
            data: null,
            error: `Este fue el error: ${error}`
        }
    }
}


export const microservice = {
    getAll: async(): Promise<{ success: boolean, data: any | null, error: any }> => {
        let data: any;
        if (typeof window === 'undefined') return {success: false, data: null, error: 'Window undefined'};
        localStorage.removeItem(MICROSERVICES_KEY)
        // data = localStorage.getItem(MICROSERVICES_KEY);
        // if (data) {
        //     console.log('HAY DATOSSSS')
        //     return {
        //         success: true,
        //         data: JSON.parse(data),
        //         error: null
        //     } ;
        // }else{
            data = await getDataTable('Microservice');
            console.log('Esta fue la respuesta', data)
            if (data.success){
                console.log('ESTE ES EL TAMÑO DE LOS DATOS: ', data.data.length)
                if (data.data != 0){
                    localStorage.setItem(MICROSERVICES_KEY, JSON.stringify(data.data))
                }
                return {
                    success: true,
                    data: data.data,
                    error: null
                }
                    
            }else {
                return {
                    success: false,
                    data: data.data,
                    error: data.error
                }
            }
        
    },

    create: async(dataMicroservice: any) => {
        if (!dataMicroservice){
            return {succes: false, data:null, error: 'No data provider'}
        }
        
        const newService: Microservice = {
            ...dataMicroservice,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        try {
            const response = await fetch('http://localhost:3000/db/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                tableName: 'Microservice',
                records: [newService],
                accessToken: localStorage.getItem('accessToken')
                })
            });

            const result = await response.json()
            if (!response.ok) {
                return {
                    success: false,
                    data: result.data,
                    error: result.message || 'Create microservice was failed'
                }
            }
            
            const services = await microservice.getAll()
            if (services.success){
                console.log('Creando microservicio :)');
                const updated = [...services.data as Microservice[], newService]
                localStorage.setItem(MICROSERVICES_KEY, JSON.stringify(updated));
            }
            return {success: true, data: result, error: null}
        }catch (error:any) {
            console.error('Error creating microservice: ', error);
            return { success: false, data: null, error: error};
        }
    }
};