import { UseCaseError } from "./use-cases-error";

export class NotAllowedError extends Error implements UseCaseError {
    constructor() {
        super('Not allowed')
    }
}