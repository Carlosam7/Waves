import type { EndpointToSend, Microservice, MicroserviceToSend } from "../lib/types";

const parseData = {
    dataMicroservice: (data: Omit<Microservice, 'createdAt' | 'updatedAt'>): Omit<MicroserviceToSend, 'createdAt' | 'updatedAt'> => {
        const points: any = data.endPoints;
        let dictEndpoints: any = {}
        if(points.length > 0){
            for (const item of points){
                dictEndpoints[item.path] = item.method
            }
        }
        // dictEndpoints = JSON.parse(dictEndpoints)

        console.log('Este es el JSON parseado',dictEndpoints)
        const name = data.routeName.toLowerCase().replace(/\s+/g, "");
        return {
            routeName: name,
            url: data.url,
            status: data.status,
            description: data.description,
            language: data.language,
            endPoints: dictEndpoints,
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