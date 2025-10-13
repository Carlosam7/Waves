import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, LoginData, RegisterData, User } from "../lib/types";

const authContext = createContext<AuthContextType | undefined> (undefined);

export function AuthProvider ({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<User>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState<boolean> (true);

    const getAccessToken = (): string | null => {
        return localStorage.getItem('accessToken');
    };

    //Verify log in
    const checkAuth = async(): Promise<void> => {
        try {
            const token = getAccessToken();
            if (!token) {
                setLoading(false)
                return;
            }

            // Verficación de token con el back
            const verifyTokenRequest = await fetch(`http://localhost:3000/verifyToken?token=${token}`)
            //const data = await verifyTokenRequest.json()

            if (verifyTokenRequest.ok) {
                const userData = localStorage.getItem('userData');

                if (userData) {
                    setUser(JSON.parse(userData));
                    setIsAuthenticated(true);
                }
            } else {
                await tryRefreshToken();
             }
        
        }catch (error) {
            console.error('Auth check failed', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
        } finally {
            setLoading(false);
        }
    };

    //Try refresh token
    const tryRefreshToken = async (): Promise<void> => {
        try {
            const refresh = localStorage.getItem('refreshToken');

            console.log('Este es el token viejo: ', localStorage.getItem('accessToken'))
            console.log('Este es el refresh: ', refresh)
            if (!refresh){
                throw new Error('No refresh Token');
            }

            const refreshTokenRequest = await fetch(`http://localhost:3000/refreshToken?rToken=${refresh}`)
            // const data = await refreshTokenRequest.data;
            if (!refreshTokenRequest.ok) {
                throw new Error('Refresh failed')
            }

            const data = await refreshTokenRequest.json();
            console.log('Esta es la respuestra del try: ', data)
            const { accessToken, refreshToken } = data.message;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            console.log('Estos son los nuevos token:')
            console.log('token:', localStorage.getItem('accessToken'))
            console.log('Refresh token:', localStorage.getItem('refreshToken'))

            setIsAuthenticated(true);
           

        } catch (error) {
            console.error('Token refresh failed: ', error);

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    //Log in
    const login = async (loginData: LoginData): Promise<{success: boolean; data?: any; error?:any}> => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json()
                return {
                    success: false,
                    data: errorData,
                    error: errorData.data,
                };
            }
            const data = await response.json();
            console.log('estos son los datos, dería haber un accesToken', data);
            const { accessToken, refreshToken } = data.userData;

            localStorage.setItem('accessToken', accessToken);
            console.log('aquí esta el accessToken: ', accessToken)
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userData', JSON.stringify({name: '1', email: loginData.email}));
            console.log('Aquí están los datos del usuario: ', JSON.stringify({name: '1', email: loginData.email}) )

            setUser({name: '1', email: loginData.email});
            setIsAuthenticated(true);
            return {
                success: true,
                data: data, // Datos completos de la respuesta
                error: null
            };

        }catch (error: any) {
            console.error('Login error: ', error);
            throw new Error('Login failed', error.message)
        }
    };

    //Register
    const signUp = async (registerData: RegisterData): Promise<{success: boolean; data?: any; error?:any}> => {
        console.log('sending signup data: ', registerData);
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            console.log('response: ', response.status);

            if (!response.ok) {
                const errorData = await response.json();

                return {
                    success: false,
                    data: errorData,
                    error: errorData.data,
                };
            }

            const data = await response.json();
            console.log('Success response:', data);
            const { accessToken, refreshToken, user: userData } = data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userData', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);
            return {
                success: true,
                data: data, // Datos completos de la respuesta
                error: null
            };

        } catch (error: any) {
            console.error('Registration error: ', error);
            throw new Error(error.message || 'Registratiom failed: ');
        }
    };

    //Logout
    const logout = async () => {
        try {
            const token = getAccessToken();
            if (token) {
                await fetch('https://localhost:3000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(token)
                });
            }
        }catch (error) {
            console.error('Logout error: ', error);
        } finally {
            localStorage.RemoveItem('accessToken');
            localStorage.RemoveItem('refreshToken');
            localStorage.RemoveItem('userData');
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <authContext.Provider value = {{ user, isAuthenticated, loading, login, signUp, logout }}>
            {children}
        </authContext.Provider>
    )
}

export function useAuth () {
    const context = useContext(authContext);
    if (!context) throw new Error('useContext must be in AuthProvider');
    return context;
}