import { postLogin } from "api/Login";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "model/Login";
import { token } from 'lib/api/apiRouter';

interface IAuthContext {
    login: (UserName: string, PassWord: string) => void;
    user: ILogin | null;
    errors: string;
}

const AuthContext = createContext<IAuthContext>({
    login: () => {},
    user: null,
    errors: '',
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [errors, setError] = useState('');
    const [user, setUser] = useState<ILogin | null>(null);

    const login = async (UserName: string, PassWord: string) => {
        try {
            const res = await postLogin(UserName, PassWord);
            if (res) {
                setUser(res);
                localStorage.setItem('@user', JSON.stringify(res));
                localStorage.setItem('@token', token);
                navigate('/');
            }
        } catch (error) {
            setError("Tên đăng nhập hoặc mật khẩu sai");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('@user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            navigate('/');
        }
    }, [navigate]);

    const AuthContextValue: IAuthContext = {
        login,
        user,
        errors
    };

    return (
        <AuthContext.Provider value={AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
