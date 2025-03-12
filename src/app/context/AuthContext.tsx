import { createContext, ReactNode, useEffect, useState } from "react"
import { supabase } from "../../infra/supabase/config";
import { Session } from "@supabase/supabase-js";

interface IAuthContext {
    logout: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    session: Session | null
}

// Cria um contexto de Auth

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Cria o codigo de como funcionara o provider, desde pegar a sessao até fazer logout

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            console.log('getSession', session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('onAuthStateChange', session)
        })

        return () => subscription.unsubscribe()
    }, [])
    
    const logout = async () => {
        await supabase.auth.signOut();
    }

    const login = async(email: string, password: string) => {
        
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            throw error;
        }
    }
    // Possui o valor da sessao e do logout dentro de um provider, no qual permite fazer um logout da sessão

    return (
        <AuthContext.Provider value={{session, logout, login}}>{ children }</AuthContext.Provider>
    )
}