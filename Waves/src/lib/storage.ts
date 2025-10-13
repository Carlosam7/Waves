// import type { Microservice } from "./types";
// const MICROSERVICES_KEY = 'microservices';

// export const storageService = {
//     getAll: (): Microservice[] => {
//         if (typeof window === 'undefined') return [];

//         const data = localStorage.getItem(MICROSERVICES_KEY);
//         return data ? JSON.parse(data) : [];
//     },

//     create: (service: Omit<Microservice, 'id' | 'createdAt' | 'updatedAt'>): Microservice => {
//         const newService: Microservice = {
//             ...service,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//         const services = storageService.getAll();
//         services.push(newService);
//         localStorage.setItem(MICROSERVICES_KEY, JSON.stringify(services));
//         return newService;
//     },

//     seed: () => {
//         const initialService = storageService.getAll();
//         if (initialService.length > 0) return;

//         const firstService: Omit<Microservice, 'id' | 'createdAt' | 'updatedAt'>[] = [
//             {
//                 name: 'Name of microservice 1',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//                 lenguage: 'Python',
//                 status: 'Active',
//                 baseUrl: 'https://name-of-microservice-1.com',
//                 image: '1.0.0',
//                 tags: ['hello', 'Etiqueta 25', 'Etiqueta 2', 'Et 3'],
//                 endpoints: [
//                     {method: 'GET', path: '/hello'}
//                 ],
//             },
//             {
//                 name: 'Name of microservice 2',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//                 lenguage: 'JS',
//                 status: 'Inactive',
//                 baseUrl: 'https://name-of-microservice-2.com',
//                 image: '1.0.0',
//                 tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
//                 endpoints: [
//                     {method: 'GET', path: '/hello'},
//                     {method: 'POST', path: '/enterName'}
//                 ],
//             },
//             {
//                 name: 'Name of microservice 3',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//                 lenguage: 'C#',
//                 status: 'Inactive',
//                 baseUrl: 'https://name-of-microservice-3.com',
//                 image: '1.0.0',
//                 tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
//                 endpoints: [
//                     {method: 'GET', path: '/hello'},
//                     {method: 'POST', path: '/enterName'}
//                 ],
//             },
//             {
//                 name: 'Name of microservice 4',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//                 lenguage: 'C#',
//                 status: 'Active',
//                 baseUrl: 'https://name-of-microservice-3.com',
//                 image: '1.0.0',
//                 tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
//                 endpoints: [
//                     {method: 'GET', path: '/hello'},
//                     {method: 'POST', path: '/enterName'}
//                 ],
//             },

//             {
//                 name: 'Name of microservice 5',
//                 description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//                 lenguage: 'Python',
//                 status: 'Error',
//                 baseUrl: 'https://name-of-microservice-3.com',
//                 image: '1.0.0',
//                 tags: ['Etiqueta 1', 'Etiqueta 2', 'Et 3', 'Et 4'],
//                 endpoints: [
//                     {method: 'GET', path: '/hello'},
//                     {method: 'POST', path: '/enterName'}
//                 ],
//             },

//         ];
//         firstService.map((service) => storageService.create(service));
//         // storageService.create(firstService)
//     }
// };