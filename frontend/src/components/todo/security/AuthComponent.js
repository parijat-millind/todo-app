import React, { useContext, useState } from "react";
import { authenticateUserApi } from "../api/TodoApiService";
import { apiCLient } from "../api/apiClient";


export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

   

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);



    async function login(username, password) {

        


        try {
            const response = await authenticateUserApi({ username, password })

            if (response.data == "200") {
                setIsAuthenticated(true);
                setUsername(username);
                const token = "Bearer " + response.data
                apiCLient.interceptors.request.use((config) => {
                    config.headers.Authorization = token
                    return config
                });
                return true;
            } else {
                logout();
                return false;
            }

        } catch (error) {
            logout();
            return false;
        }

    }

    function logout() {
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}
