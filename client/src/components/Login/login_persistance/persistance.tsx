import { ReactNode, useContext, useState, createContext } from "react";

interface AuthContextType {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
    logout: () => void;
    userFirstName: string | null;
    setUserFirstName: (value: string | null) => void;
    login: (token: string, firstName: string) => void
;}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [isLogged, setIsLogged] = useState<boolean>(() => {
        return !!localStorage.getItem('token');
    });
    const [userFirstName, setUserFirstName] = useState<string | null>(() => {
        const storedName = localStorage.getItem('userFirstName');
        return storedName;
    });
    const login = (token: string, firstName: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userFirstName', firstName);
        setIsLogged(true);
    }
    const logout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, logout, userFirstName,setUserFirstName, login }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
