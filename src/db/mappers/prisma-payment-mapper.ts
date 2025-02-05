import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { Payment } from "@/src/domain/enterprise/entities/payment";
import { Prisma, Payment as PrismaPayment } from "@prisma/client";

export class PrismaPaymentMapper {
    static toDomain(raw: PrismaPayment): Payment {
        return Payment.create({
            paidAt: raw.paidAt,
            amount: raw.amount,
            method: raw.method,
            idClient: new UniqueEntityId(raw.idClient)
        }, raw.id)
    }

    static toDatabase(payment: Payment): Prisma.PaymentUncheckedCreateInput {

        return {
            id: payment.id.toString(),
            idClient: payment.idClient.toString(),
            paidAt: payment.paidAt,
            amount: payment.amount,
            method: payment.method
        }
    }
}