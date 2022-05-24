import { useState, createContext, useContext } from "react";

const initialState = {
    showLogin: false,
    setShowLogin: () => {},
    showRegister: false,
    setShowRegister: () => {}
}

const ModalContext = createContext(initialState)


export const ModalProvider = ({ children }) => {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    return (
        <ModalContext.Provider value={{ showLogin, showRegister, setShowLogin, setShowRegister }}>
            { children }
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)
