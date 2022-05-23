import { useState, createContext, useContext } from "react";
import { useLogoutMutation } from '../api/index'
import { toast } from 'react-toastify'
 
const initialState = {
    isAuthenticated: false,
    user: {}
}

const AuthContext = createContext({
    authStatus: initialState, 
    setAuthStatus: (state) => state, 
    resetAuthStatus: () => {},
    setBookmarks: (arrayOfBookmarks) => {},
    setFollowing: (arrayOfFollowers) => {}
})

export const AuthProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(initialState)

    const [ removeCookie ] = useLogoutMutation()

    const resetAuthStatus = async () => {
        await removeCookie()
        localStorage.clear()
        setAuthStatus(initialState)
        toast.info('User signed out')
    }

    const setBookmarks = (array) => {
        const { user: userData } = authStatus
        const user = {
            ...userData,
            bookmarks: [...array]
        }
        setAuthStatus((state) => ({
            ...state,
            user
        }))
    }

    const setFollowing = (array) => {
        const { user: userData } = authStatus
        const user = {
            ...userData,
            following: [...array]
        }
        setAuthStatus((state) => ({
            ...state,
            user
        }))
    }

    return(
        <AuthContext.Provider value={{ authStatus, setAuthStatus, resetAuthStatus, setBookmarks, setFollowing }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
