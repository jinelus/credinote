

// export async function createPayment(payment: MakePaymentUseCaseProps){
//     const createPaymentUseCase = new MakePaymentUseCase(paymentRepository, clientRepository)

//     await createPaymentUseCase.execute(payment)
// }

// export async function deletePayment(paymentId: string){

//     const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository)

//     const result = await deletePaymentUseCase.execute({paymentId})

//     if(result.isLeft()) {
//         return result.value
//     }
// }

// export async function fetchPaymentsByClient({userId, page = 1}: {userId: string, page?: number}){

//     const fetchPaymentsByClientUseCase = new FetchPaymentsByClientUseCase(paymentRepository, clientRepository)

//     const result = await fetchPaymentsByClientUseCase.execute({clientId: userId, page})
    
//     return result.value
// }