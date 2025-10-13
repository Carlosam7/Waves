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

export interface Microservice {
    name: string;
    description: string;
    language: LenguageType;
    status: MicroserviceStatus;
    baseUrl: string;
    endpoints: Endpoint[];
    createdAt: Date;
    updatedAt: Date;
    image: string;
    tags: string[];
    code: string;
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