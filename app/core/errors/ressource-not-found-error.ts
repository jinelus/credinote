import { UseCaseError } from "./use-cases-error";


export class RessourceNotFoundError extends Error implements UseCaseError {
    constructor() {
        super('Resource not found.')
    }
}