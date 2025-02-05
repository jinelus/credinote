
import { compare} from "bcryptjs";
import { User } from "../../enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { Either, left, right } from "@/src/core/either";
import { InvalidCredentialsError } from "@/src/core/errors/invalid-credentials-error";

interface AuthentifcateUseCaseRequest {
    email: string,
    password: string
}

type AuthentifcateUseCaseResponse = Either<InvalidCredentialsError, {user: User}>

export class AuthentifcateUseCase {

    constructor(private usersRepository: UserRepository){}

    async execute({email, password}: AuthentifcateUseCaseRequest): Promise<AuthentifcateUseCaseResponse>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            return left(new InvalidCredentialsError())
        }

        const isPasswordCorrect = await compare(password, user.password)

        if(!isPasswordCorrect){
            return left(new InvalidCredentialsError())
        }

        return right({user})
    }
}