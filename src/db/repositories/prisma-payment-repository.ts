import { PaymentRepository } from "@/src/domain/application/repositories/payment-repository";
import { Payment } from "@/src/domain/enterprise/entities/payment";
import { prisma } from "../prisma-service";
import { PrismaPaymentMapper } from "../mappers/prisma-payment-mapper";
import { PaginationationParams } from "@/src/core/repositories/pagination-params";

export class PrismaPaymentRepository implements PaymentRepository {
    async findById(id: string): Promise<Payment | null> {
        const payment = await prisma.payment.findUnique({
            where: {
                id
            }
        })

        if(!payment) return null

        return PrismaPaymentMapper.toDomain(payment)
    }
    async findPaymentsByClient(clientId: string, {page}: PaginationationParams): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            where: {
                idClient: clientId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return payments.map(PrismaPaymentMapper.toDomain)
    }
    async delete(payment: Payment): Promise<void> {
        await prisma.payment.delete({
            where: {
                id: payment.id.toString()
            }
        })
    }
    async create(payment: Payment): Promise<void> {
        await prisma.payment.create({
            data: PrismaPaymentMapper.toDatabase(payment)
        })
    }
    
}