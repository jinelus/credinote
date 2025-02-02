import { UserRepository } from "@/app/domain/application/repositories/user-repository";
import { User } from "@/app/domain/enterprise/entities/user";
import { prisma } from "../prisma-service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: PrismaUserMapper.toDatabase(user)
        })
    }
    async save(user: User): Promise<void> {
        await prisma.user.update({
            where: {
                id: user.id.toString()
            },
            data: PrismaUserMapper.toDatabase(user)
        })
    }
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) return null

        return PrismaUserMapper.toDomain(user)
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) return null

        return PrismaUserMapper.toDomain(user)
    }
    async delete(user: User): Promise<void> {
        await prisma.user.delete({
            where: {
                id: user.id.toString()
            }
        })
    }
    
}