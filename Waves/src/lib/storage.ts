import type { Microservice } from "./types";
const MICROSERVICES_KEY = 'microservices';

export const storageService = {
    getAll: (): Microservice[] => {
        if (typeof window === 'undefined') return [];

        const data = localStorage.getItem(MICROSERVICES_KEY);
        return data ? JSON.parse(data) : [];
    },

    create: (service: Omit<Microservice, 'id' | 'createdAt' | 'updatedAt'>): Microservice => {
        const newService: Microservice = {
            ...service,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const services = storageService.getAll();
        services.push(newService);
        localStorage.setItem(MICROSERVICES_KEY, JSON.stringify(services));
        return newService;
    },

    seed: () => {
        const initialService = storageService.getAll();
        if (initialService.length > 0) return;

        const firstService: Omit<Microservice, 'id' | 'createdAt' | 'updatedAt'>[] = [
            {
                name: 'Name of microservice 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                lenguage: 'python',
                status: 'active',
                baseUrl: 'https://name-of-microservice-1.com',
                version: '1.0.0',
                tags: ['hello', 'Etiqueta 25', 'Etiqueta 2', 'Et 3'],
                endpoints: [
                    {id: crypto.randomUUID(), method: 'GET', path: '/hello', description: 'Returns a Hello World message'}
                ],
            },
            {
                name: 'Name of microservice 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                lenguage: 'javascript',
                status: 'inactive',
                baseUrl: 'https://name-of-microservice-2.com',
                version: '1.0.0',
                tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
                endpoints: [
                    {id: crypto.randomUUID(), method: 'GET', path: '/hello', description: 'Returns a Hello World message'},
                    {id: crypto.randomUUID(), method: 'POST', path: '/enterName', description: 'Enter a name'}
                ],
            },
            {
                name: 'Name of microservice 3',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                lenguage: 'c#',
                status: 'inactive',
                baseUrl: 'https://name-of-microservice-3.com',
                version: '1.0.0',
                tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
                endpoints: [
                    {id: crypto.randomUUID(), method: 'GET', path: '/hello', description: 'Returns a Hello World message'},
                    {id: crypto.randomUUID(), method: 'POST', path: '/enterName', description: 'Enter a name'}
                ],
            },
            {
                name: 'Name of microservice 4',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                lenguage: 'c#',
                status: 'active',
                baseUrl: 'https://name-of-microservice-3.com',
                version: '1.0.0',
                tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
                endpoints: [
                    {id: crypto.randomUUID(), method: 'GET', path: '/hello', description: 'Returns a Hello World message'},
                    {id: crypto.randomUUID(), method: 'POST', path: '/enterName', description: 'Enter a name'}
                ],
            },

            {
                name: 'Name of microservice 5',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                lenguage: 'python',
                status: 'error',
                baseUrl: 'https://name-of-microservice-3.com',
                version: '1.0.0',
                tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
                endpoints: [
                    {id: crypto.randomUUID(), method: 'GET', path: '/hello', description: 'Returns a Hello World message'},
                    {id: crypto.randomUUID(), method: 'POST', path: '/enterName', description: 'Enter a name'}
                ],
            },

        ];
        firstService.map((service) => storageService.create(service));
        // storageService.create(firstService)
    }
};