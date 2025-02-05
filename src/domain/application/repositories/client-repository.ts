
import { PaginationationParams } from "@/src/core/repositories/pagination-params";
import { Client } from "../../enterprise/entities/client";

export interface FetchClientProps {
    userId: string
    query: string
}

export interface ClientRepository {
    create(client: Client): Promise<void>
    save(client: Client): Promise<void>
    findById(id: string): Promise<Client | null>
    findManyRecent(userId: string, params: PaginationationParams): Promise<Client[]>
    findManyByName({query, userId}: FetchClientProps): Promise<Client[]>
    delete(client: Client): Promise<void>
}