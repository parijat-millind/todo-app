import React, { useContext, useState } from "react";
import { authenticateUserApi } from "../api/TodoApiService";
import { apiCLient } from "../api/apiClient";

//create a context
export const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

//share context with other components{children}
export default function AuthProvider({ children }) {

    //put some state in the context
    // const [number, setNumber] = useState(0);

    //setInterval(() => setNumber(number + 1), 10000);
    //increment number every  10 second

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // function login(username, password) {
    //     if (username === 'parijat' && password === '1203') {
    //         setIsAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setIsAuthenticated(false);
    //         return false;
    //     }
    // }


    async function login(username, password) {

        // const baToken = 'Basic ' + window.btoa(username + ":" + password);

        // try {
        //     const response = await executeBasicAuth(baToken)


        //     if (response.status === 200) {
        //         setIsAuthenticated(true);
        //         setUsername(username);
        //         setToken(baToken);
        // apiCLient.interceptors.request.use((config) => {
        //     config.headers.Authorization = baToken
        //     return config
        // });

        //         return true;
        //     } else {
        //         logout();
        //         return false;
        //     }
        // } catch (error) {
        //     logout();
        //     return false;
        // }


        try {
            const response = await authenticateUserApi({ username, password })

            if (response.data === "success") {
                setIsAuthenticated(true);
                setUsername(username);
                setToken("Basic cGFyaWphdDoxMjAz");
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