export type LenguageType = "Python" | "JS" | "C#";
export type MicroserviceStatus = 'Active' | 'Inactive' | 'Error';

export interface Endpoint {
    "method": "GET" | "POST" | "PUT" | "DELETE";
    "path": string;
}

export type EndPointFormProps = {
    data: Omit<Microservice, 'createdAt' | 'updatedAt'>;
    setData: React.Dispatch<React.SetStateAction<Omit<Microservice, 'createdAt' | 'updatedAt'>>>;
}

export type EndPointFormPropsEdit = {
    data: Microservice;
    setData: React.Dispatch<React.SetStateAction<Microservice>>;
}

export interface Microservice {
    _id: string;
    routeName: string;
    url: string;
    status: MicroserviceStatus;
    description: string;
    language: LenguageType;
    endPoints: Endpoint[];
    code: string;
    createdAt: Date;
    updatedAt: Date;
    // tags: string[];
}

export interface EndpointToSend {
    [clave: string] : string
}

export interface MicroserviceToSend {
    routeName: string;
    url: string;
    status: MicroserviceStatus;
    description: string;
    language: LenguageType;    
    endPoints: EndpointToSend;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    // tags: string[];
}

export type Theme = 'light' | 'dark';
export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export interface BoxDialogProp {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  data: Omit<Microservice, 'createdAt' | 'updatedAt'>;
  setData: React.Dispatch<React.SetStateAction<Omit<Microservice, 'createdAt' | 'updatedAt'>>>;
  activeFunction: boolean
  setActiveFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BoxDialogEditProp {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  data: Microservice;
  setData: React.Dispatch<React.SetStateAction<Microservice>>;
  activeFunction: boolean
  setActiveFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export type User = {
    name:     string;
    email:  string;
} | null;

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (loginData: LoginData) => Promise<{success: boolean; data?: any; error?:any}>;
    signUp: (loginData: RegisterData) => Promise<{success: boolean; data?: any; error?:any}>;
    logout: () => Promise<void>;
}

export type FormType = 'Log in' | 'Sign up';
export interface LoginRegisterProp {
    typeForm: FormType;
}

export interface ApiResponse<T> { 
    success: boolean; 
    data: T; 
    error?: any 
}