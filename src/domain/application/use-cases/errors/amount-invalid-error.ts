import { UseCaseError } from "@/src/core/errors/use-cases-error";

export class AmountInvalidError extends Error implements UseCaseError {
    constructor() {
        super('Amount invalid.')
    }
}