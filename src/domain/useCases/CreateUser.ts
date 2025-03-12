import { IUser } from "../entities/IUser";
import { IUserRepository } from "../repositories/IUserRepository";

// useCases para criar usuario
// permite isolar o banco utilizado

export class CreateUser {

    constructor(private userRepository: IUserRepository) {}

    async execute(user: Omit<IUser, 'id'>) {
        this.userRepository.createUser(user);
    }
}