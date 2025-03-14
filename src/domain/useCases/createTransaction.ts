import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class CreateTransaction{
    constructor(private repository: ITransactionRepository) { }
    
    execute(value: number, typeId:number, userId: string) {
        this.repository.create(value, typeId, userId)
    }
}