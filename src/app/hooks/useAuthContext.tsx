import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// Um hook que chama o context de auth

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Contexto não disponível")
    }

    return context 
}