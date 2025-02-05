import { UseCaseError } from "./use-cases-error";

export class InvalidCredentialsError extends Error implements UseCaseError {
    constructor() {
        super('Invalid credentials.')
    }
}