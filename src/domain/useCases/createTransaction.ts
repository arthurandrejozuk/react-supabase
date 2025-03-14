import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class CreateTransaction{
    constructor(private repository: ITransactionRepository) { }
    
    execute(value: number, typeId:number, userId: string): Promise<void> {
       return this.repository.create(value, typeId, userId)
    }
}