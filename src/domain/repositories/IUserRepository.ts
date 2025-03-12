import { IUser } from "../entities/IUser";

// interface para repositorio de usuarios

export interface IUserRepository {
    createUser(user: Omit<IUser, 'id'>) : Promise<void> 
}