import { postLogin } from "api/Login";
import { postRole } from "api/Role";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "model/Login";
import { IRole } from "model/Role"; 
import { token } from 'lib/api/apiRouter';

interface IAuthContext {
    login: (UserName: string, PassWord: string) => void;
    user: ILogin | null;
    roles: IRole[] | null; 
    errors: string;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    login: () => {},
    user: null,
    roles: null, 
    errors: '',
    logout: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [errors, setError] = useState('');
    const [user, setUser] = useState<ILogin | null>(null);
    const [roles, setRoles] = useState<IRole[] | null>(null);

    const login = async (UserName: string, PassWord: string) => {
        try {
            const res = await postLogin(UserName, PassWord);
            if (res) {
                setUser(res);
                localStorage.setItem('@user', JSON.stringify(res));
                localStorage.setItem('@token', token);

                const roleRes = await postRole({ UserID: res.UserID } as IRole);
                if (roleRes && roleRes.data) {
                    setRoles(roleRes.data);
                    localStorage.setItem('@roles', JSON.stringify(roleRes.data));
                }
                navigate('/');
            }
        } catch (error) {
            setError("Tên đăng nhập hoặc mật khẩu sai");
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('@user');
        const storedRoles = localStorage.getItem('@roles');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            if (storedRoles) {
                setRoles(JSON.parse(storedRoles));
            }
            navigate('/');
        }
    }, []);

    const logout = async () => {
        localStorage.removeItem('@user');
        localStorage.removeItem('@token');
        localStorage.removeItem('@roles');
        setUser(null);
        setRoles(null);
        navigate('/');
    };

    const AuthContextValue: IAuthContext = {
        login,
        user,
        roles,
        errors,
        logout,
    };

    return (
        <AuthContext.Provider value={AuthContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };