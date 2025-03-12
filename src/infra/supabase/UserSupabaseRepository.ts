import { IUser } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { supabase } from "./config";

// Criação de usuario no supabase

export class UserSupabaseRepository implements IUserRepository{
    
    async createUser(user: Omit<IUser, "id">) {
        const { error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                emailRedirectTo: 'http://localhost:5173/',
            },
        })
        if (error) {
            throw error;
        }
    } 
}