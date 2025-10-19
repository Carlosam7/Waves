import { toast } from "sonner";
import type { Microservice } from "../lib/types";
import parseData from "./parseData";
import { microservice } from "./ServiceDb";

export const createService = async (data: Omit<Microservice, 'createdAt' | 'updatedAt'>) => {
    const dataParse = parseData.dataMicroservice(data);
    data.code = parseData.codeMicroservice(data.code)
    const toastID = toast.loading('Deploying microservice...');
    console.log(data.code)
    try {
        console.log('ESTO ES LO QUE ENVÍO: ', dataParse)
        const response = await microservice.deploy(dataParse);
        if (!response.success){
            toast.error(`Failed: ${response.error || 'Error creating microservice'}`, {
                id: toastID
            });
        }else {
            toast.success(`Microservice deployed successfully!`, {
                id: toastID,
                duration: 10
            });
        }
    }catch (error) {
        console.error('Creation failed. ', error);
        toast.error(`Unexpected error: ${error}`, {
            id: toastID
        });
    }
}