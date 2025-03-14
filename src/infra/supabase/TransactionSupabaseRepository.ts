import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import { supabase } from "./config";

export class TransactionSupabaseRepository implements ITransactionRepository {

    async create(value: number, typeId: number, userId: string) {
          console.log('Type ID:', typeId)
        const { error } = await supabase
            .from('transaction')
            .insert([
                { transaction_type_id: typeId, value: value, user_id: userId},
            ])
            .select()
        if (error) {
            throw error;
        }
    }

}