import { PaginationationParams } from "@/src/core/repositories/pagination-params";
import { ClientRepository, FetchClientProps } from "@/src/domain/application/repositories/client-repository";
import { Client } from "@/src/domain/enterprise/entities/client";

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

    async findManyRecent(userId: string, { page}: PaginationationParams): Promise<Client[]> {
        const clients = this.items
        .filter(client => client.organizationId.toString() === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page - 1) * 20, page * 20)

        return clients
    }

    async findManyByName({query, userId}: FetchClientProps): Promise<Client[]> {
        const clients = this.items
        .filter(client => client.name.toLowerCase().includes(query.toLowerCase()) && client.organizationId.toString() === userId)
        .slice(0, 10)

        return clients
    }

    async delete(client: Client): Promise<void> {
        const clientIndex = this.items.findIndex(item => item.id === client.id)
        this.items.splice(clientIndex, 1)
    }
}