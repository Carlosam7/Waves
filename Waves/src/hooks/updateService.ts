import { toast } from "sonner";
import type { Microservice } from "../lib/types";
import parseData from "./parseData";
import { microservice } from "./ServiceDb";

export const updateService = async (data: Microservice, name: string) => {
    const dataParse = parseData.dataMicroservice(data);
    data.code = parseData.codeMicroservice(data.code)
    const toastId = toast.loading('Updating service...');
    try {
        const response  = await microservice.update(dataParse, name);
        console.log('ESTA ES LA RESPUESTA', response)
        if (!response.success){
            toast.error(response.message, {
                id: toastId
            })
        }else {
            toast.success('Microservice successfully updated.', {
                id: toastId,
            });
        }
    }catch (error) {
        console.error('Updating failed. ', error)
    }
}