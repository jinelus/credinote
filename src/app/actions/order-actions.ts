

// export async function createOrder(order: CreateOrderUseCaseProps){

//     const {idClient, total} = order

//     const createOrderUseCase = new CreateOrderUseCase(orderRepository, clientRepository)

//     await createOrderUseCase.execute({idClient, total})

// }

// export async function getOrder(orderId: string){
//     const getOrderUseCase = new GetOrderUseCase(orderRepository)

//     const result = await getOrderUseCase.execute({orderId})

//     if(result.isLeft()) {
//         return result.value
//     }

//     return result.value.order
// }

// export async function fetchOrdersByClient({userId, page = 1}: {userId: string, page?: number}){

//     const fetchOrdersByClientUseCase = new FetchOrdersByClientUseCase(orderRepository, clientRepository)

//     const result = await fetchOrdersByClientUseCase.execute({clientId: userId, page})
    
//     return result.value
// }

// export async function deleteOrder(orderId: string){

//     const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository)

//     const result = await deleteOrderUseCase.execute({orderId})

//     if(result.isLeft()) {
//         return result.value
//     }
// }