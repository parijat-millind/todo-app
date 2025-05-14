import React, { useContext, useState } from "react";
import { authenticateUserApi } from "../api/TodoApiService";
import { apiCLient } from "../api/apiClient";

export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);


export default function AuthProvider({ children }) {



    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [username, setUsername] = useState(null);

    async function login(email, password) {

        try {
            const response = await authenticateUserApi({ email, password })
            if (response.status == "200") {
                setIsAuthenticated(true)
                setFirstName(response.data[1])
                const token = "Bearer " + response.data[0]
                apiCLient.interceptors.request.use((config) => {
                    config.headers.Authorization = token
                    return config
                })

                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }

    }

    function logout() {
        setIsAuthenticated(false);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, firstName }}>
            {children}
        </AuthContext.Provider>
    )
}
