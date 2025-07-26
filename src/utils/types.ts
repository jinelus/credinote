export interface PaginationParams {
    page?: number
    perPage?: number
    orderBy?: string
    order?: 'desc' | 'asc'
    search?: string
}