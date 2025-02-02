import { User } from "@/app/domain/enterprise/entities/user";
import { Prisma, User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
    static toDomain(user: PrismaUser): User {
        return User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            role: user.role
        }, user.id)
    }

    static toDatabase(user: User): Prisma.UserUncheckedCreateInput {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            role: user.role
        }
    }
}