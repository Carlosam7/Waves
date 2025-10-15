import type { Microservice, MicroserviceToSend } from "../lib/types";
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
        // console.log('QUÉ DIJO', response)
        if (!response.ok) {
            const errorData = await response.json();
            // console.log('Error al obtener datos', errorData);
            return {
                success: false,
                data: errorData.data,
                error: errorData.message
            }
        }
        
        if (response.ok) {
            const data = await response.json();
            // console.log('Datos obtenidos exitosamente: ', data)
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
    getAll: async(): Promise<{ success: boolean, data: Microservice[] | [], error: any }> => {
        let data: any;
        if (typeof window === 'undefined') return {success: false, data: [], error: 'Window undefined'};
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
            data = await getDataTable('microservice');
            // console.log('Esta fue la respuesta', data)
            if (data.success){
                // console.log('ESTE ES EL TAMÑO DE LOS DATOS: ', data.data.length)
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

    create: async(dataMicroservice: Omit<MicroserviceToSend, 'createdAt' | 'updatedAt'>) => {
        // console.log('VOY EMPEZANDO')
        if (!dataMicroservice){
            return {succes: false, data:null, error: 'No data provider'}
        }
        
        const newService: MicroserviceToSend = {
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
                tableName: 'microservice',
                records: [newService],
                accessToken: localStorage.getItem('accessToken')
                })
            });

            const result = await response.json()
            // console.log('ESTE ES EL RESULT: ', result)
            if (!response.ok) {
                return {
                    success: false,
                    data: result.data,
                    error: result.message || 'Create microservice was failed'
                }
            }
            // console.log('Esto es longitud: ', result.data.inserted.length)
            // console.log('ESTA ES LA RAZÓN: ', result.data.skipped[0])
            if (result.data.inserted.length === 0){
                const reason = result.data.skipped[0]
                return {success: false, data: null, error: reason.reason}
            }
            
            // const services = await microservice.getAll()
            // if (services.success){
            //     // console.log('Creando microservicio :)');
            //     const updated = [...services.data as Microservice[], newService]
            //     localStorage.setItem(MICROSERVICES_KEY, JSON.stringify(updated));
            // }
            return {success: true, data: result, error: null}
        }catch (error:any) {
            console.error('Error creating microservice: ', error);
            return { success: false, data: null, error: error};
        }
    },

    deploy: async (dataMicroservice: Omit<MicroserviceToSend, 'createdAt' | 'updatedAt'>) => {
        console.log('Estos son los datos: ', dataMicroservice)
        if (!dataMicroservice){
            return {succes: false, data:null, error: 'No data provider'}
        }
        
        const newService: MicroserviceToSend = {
            ...dataMicroservice,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        console.log('ESTOS SON LOS DATOS QUE ENVIARÉ A LA PETICIÓN: ', newService)
        try {
            const response = await fetch('http://localhost:3000/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    msData:         newService,
                    accessToken:    localStorage.getItem('accessToken'),
                })
            });
            const result = await response.json()
            console.log('ESTE ES EL RESULTADO: ', result)
            if (!response.ok) {
                return {
                    success: false,
                    data: result.data,
                    error: result.message || 'Create microservice was failed'
                }
            }

            return {success: true, data: result, error: null}
        }catch (error:any) {
            console.error('Error creating microservice: ', error);
            return { success: false, data: null, error: error};
        }finally {
            setTimeout(() => window.location.reload(), 100)
        }
    },

    delete: async (nameMicroservice: string) => {
        if (!nameMicroservice) {
            console.error('The Microservice does not exist');
            return false;
        }
        try {
            const responseDelete = await fetch(`http://localhost:3000/ms/delete/${nameMicroservice}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({accessToken: localStorage.getItem('accessToken')}
                )
            });

            const result = await responseDelete.json()
            if (!responseDelete.ok) {
                console.error('Ups, something went wrong. We were enabled to delete the microservice: ', result.message);
                return false;
            }
            // await microservice.getAll();
           // console.log('ESTE ES EL NOMBRE QUE QUIERO ELIMINAD: ', nameMicroservice)
            console.warn('The microservice has been removed.')
            return true;
        }catch (error) {
            console.error('Error deleting microservice: ', error)
            alert(`Error deleting microservice: ${error}`)
            return false
        } finally {
            setTimeout(() => window.location.reload(), 100)
        }
    },
    update: async (data: any, nameMicroservice: string): Promise<{success: boolean, message: string}> => {
        data.updatedAt = new Date
        console.log('ESTOS SON LOS DATOS QUE SE VAN A CONSULTAR: ', data)
        if (!data) {
            return {success: false, message: 'No data provider'}
        }
        console.log('Se mandó esto: ', data)
        try {
            const response = await fetch('http://localhost:3000/ms/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                            tableName: 'microservice',
                            idColumn: 'routeName',
                            idValue: nameMicroservice,
                            updates: {routeName: data.routeName, 
                                        status: data.status, 
                                        description: data.description, 
                                        language: data.language, 
                                        endPoints: data.endPoints, 
                                        code: data.code,
                                        updatedAt: new Date
                                    }
                    },
                    accessToken: localStorage.getItem('accessToken')
                })
            });
            
            const result = await response.json();
            if (!response.ok) {
                return {    
                        success: false, 
                        message: `Ups, something went wrong. We were enabled to edit the microservice: ${result.message}`
                        }
            }
            console.log('DATOS ENVIADOS EN EL UPDATE: ', result.data)
            return {
                    success: true, 
                    message: `Data successfully updated. ${result.message}`
                    }
        }catch (error) {
            console.error('Error updating microservice: ', error);
            return {
                    success: false,
                    message: `Ups, error updating microservice: ${error}`
                    }
        }finally {
            // setTimeout(() => window.location.reload(), 100)   
        }
    }
};