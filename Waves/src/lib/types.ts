export type LenguageType = "python" | "javascript" | "c#";
export type MicroserviceStatus = "active" | "inactive" | "error";

export interface Endpoint {
    id: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
}

export interface Microservice {
    id: string;
    name: string;
    description: string;
    lenguage: LenguageType;
    status: MicroserviceStatus;
    baseUrl: string;
    endpoints: Endpoint[];
    createdAt: Date;
    updatedAt: Date;
    version: string;
    tags: string[];
}

export type BoxDialogProp = {
    dialogRef: {current: HTMLDialogElement | null;}
}