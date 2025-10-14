import type { Microservice } from "../lib/types";
import parseData from "./parseData";
import { microservice } from "./ServiceDb";

export const createService = async (data: Omit<Microservice, 'createdAt' | 'updatedAt'>) => {
    const dataParse = parseData.dataMicroservice(data);
    data.code = parseData.codeMicroservice(data.code)
    // console.log('Esto es lo que envio: ', dataParse)
    console.log(data.code)
    try {
        console.log('ESTO ES LO QUE ENVÍO: ', dataParse)
        const response = await microservice.deploy(dataParse);
        // console.log('PASÉ ESTA PRUEBA??')
        if (!response.success){
            alert(response.error)
        }else {
            alert('Microservicio creado con éxito');
            //navigate('/app/microservice', { replace: true });
            //setTimeout(() => window.location.reload(), 100)
        }
    }catch (error) {
        console.error('Creation failed. ', error)
    }
}