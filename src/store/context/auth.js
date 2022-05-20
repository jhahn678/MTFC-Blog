import { useState, createContext, useContext } from "react";
import { useLogoutMutation } from '../api/index'
import { toast } from 'react-toastify'
 
const initialState = {
    isAuthenticated: false,
    user: {}
}

const AuthContext = createContext({ authStatus: initialState, setAuthStatus: (state) => state , resetAuthStatus: () => {}})

export const AuthProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(initialState)

    const [ removeCookie ] = useLogoutMutation()

    const resetAuthStatus = async () => {
        await removeCookie()
        localStorage.clear()
        setAuthStatus(initialState)
        toast.info('User signed out')
    }

    return(
        <AuthContext.Provider value={{ authStatus, setAuthStatus, resetAuthStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
