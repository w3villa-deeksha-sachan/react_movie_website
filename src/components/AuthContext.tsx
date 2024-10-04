
// import React, { createContext, useContext, useState } from 'react';

// interface User {
//     name: string;
   
// }

// interface AuthContextType {
//     isAuthenticated: boolean;
//     user: User | null;
//     login: (token: string) => void;
//     logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Hardcoded to true
//     const [user, setUser] = useState<User | null>({
//         name: 'Eve Holt',  // Hardcoded user name
//           // Hardcoded user email
//     });

//     const login = (token: string) => {
//         localStorage.setItem("token", token);
//         setIsAuthenticated(true);
//         setUser({
//             name: 'John Doe',  // Hardcoded user name
//               // Hardcoded user email
//         });
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setIsAuthenticated(false);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  // Start with false
    const [user, setUser] = useState<User | null>(null);

    // Check if a token exists in localStorage on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            setUser({
                name: 'Eve Holt',  // You can fetch real user data from an API
            });
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setUser({
            name: 'John Doe',  // Hardcoded user name
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

