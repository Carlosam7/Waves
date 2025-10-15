import type { Microservice } from "../lib/types";
import parseData from "./parseData";
import { microservice } from "./ServiceDb";

export const updateService = async (data: Microservice, name: string) => {
    const dataParse = parseData.dataMicroservice(data);
    data.code = parseData.codeMicroservice(data.code)
    // console.log('Esto es lo que envio: ', dataParse)
    console.log('Este es el Endpoint parseado ', dataParse.endPoints)
    console.log('Este es el microservicio', dataParse)
    try {
        const response  = await microservice.update(dataParse, name);
        console.log('ESTA ES LA RESPUESTA', response)
        if (!response.success){
            alert(response.message)
        }else {
            alert('Microservice successfully updated.');
            //navigate('/app/microservice', { replace: true });
            //setTimeout(() => window.location.reload(), 100)
        }
    }catch (error) {
        console.error('Updating failed. ', error)
    }
}