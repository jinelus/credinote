import { PaginationationParams } from "@/app/core/repositories/pagination-params";
import { ClientRepository } from "@/app/domain/application/repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository {
    public items: Client[] = [];

    async create(client: Client): Promise<void> {
        this.items.push(client)
    }

    async save(client: Client): Promise<void> {
        const clientIndex = this.items.findIndex(item => item.id === client.id)
        this.items[clientIndex] = client
    }

    async findById(id: string): Promise<Client | null> {
        const client = this.items.find(item => item.id.toString() === id)

        if(!client){
            return null
        }

        return client
    }

    async findManyRecent({ page}: PaginationationParams): Promise<Client[]> {
        const clients = this.items
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page - 1) * 20, page * 20)

        return clients
    }
}