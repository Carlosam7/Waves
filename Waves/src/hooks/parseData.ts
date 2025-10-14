import type { EndpointToSend, Microservice, MicroserviceToSend } from "../lib/types";

const parseData = {
    dataMicroservice: (data: Omit<Microservice, 'createdAt' | 'updatedAt'>): Omit<MicroserviceToSend, 'createdAt' | 'updatedAt'> => {
        const points: any = data.endPoints;
        let dictEndpoints: EndpointToSend = {}
        if(points.length > 0){
            for (const item of points){
                dictEndpoints[item.path] = item.method
            }
        }
        return {
            routeName: data.routeName,
            url: data.url,
            status: data.status,
            description: data.description,
            language: data.language,
            endpoints: dictEndpoints,
            code: data.code
        }

    },

    codeMicroservice: (code: string): string => {
        return code
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('; ')
            .replace(/; ;/g, ';')
            .replace(/\s+/g, ' ')
            .trim();
    }
};

export default parseData;