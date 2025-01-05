
import { PaginationationParams } from "@/app/core/repositories/pagination-params";
import { Client } from "@/app/domain/enterprise/entities/client";

export interface ClientRepository {
    create(client: Client): Promise<void>
    save(client: Client): Promise<void>
    findById(id: string): Promise<Client | null>
    findManyRecent(params: PaginationationParams): Promise<Client[]>
}