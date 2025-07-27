import { OrderList } from "@/src/components/orders/order-list";
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from "nuqs/server";
import { getClient, getOrders } from "../action";
import type { PaginationParams } from "@/src/utils/types";
import { ClientDetailsCard } from "@/src/components/clients/client-details-card";
import { Container } from "@/src/components/base-components/container";
import { OrderSelect } from "@/src/components/filter/order-select";
import { SearchFilter } from "@/src/components/filter/search";
import { PaginationButtons } from "@/src/components/pagination";
import Link from "next/link";
import Button from "@/src/components/base-components/button";

const filterSearchParams = {
    client: parseAsString,
    perPage: parseAsInteger,
    page: parseAsInteger,
    orderBy: parseAsString,
    order: parseAsString,
    search: parseAsString,
}
  
const loadSearchParams = createLoader(filterSearchParams)

export default async function OrdersPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<SearchParams>
}) {

    const { slug } = await params
    const queries = await loadSearchParams(searchParams)

    const defaultParams: PaginationParams = {
        page: queries.page ?? 1,
        perPage: queries.perPage ?? 10,
        orderBy: queries.orderBy ?? 'createdAt',
        order: queries.order as ('asc' | 'desc') ?? 'desc',
        search: queries.search ?? ''
    }

    const response = await getOrders(slug, defaultParams)

    if (!response.success || !response.data) {
        return
      }
    
      const selectedClient = queries.client ? await getClient(queries.client) : null

    return (
        <Container className='flex flex-col lg:flex-row gap-8'>
          <div className="mt-8 flex-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Todos Pedidos</h2>
                <div className='flex items-center gap-4'>
                  <OrderSelect />
                  <Link href={`/${slug}/nova-compra`}>
                    <Button>
                      Nova compra
                    </Button>
                  </Link>
                </div>
              </div>
              <SearchFilter placeholder="Buscar por nome..." />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {response.data.orders.length > 0 ? response.data.orders.map((order, index) => (
                      <OrderList
                        key={order.id}
                        index={index}
                        order={order}
                      />
                    )) : (
                      <tr>
                        <td colSpan={3} className='text-center py-3'> Nenhum pedido achado </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <PaginationButtons currentPage={queries.page ?? 1} maxPage={response.data.maxPage} />
            </div>
          </div>

          {selectedClient?.success && selectedClient.data && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient.data}
              slug={slug}
              redirectCancelLink={`/${slug}/pedidos`}
            />
          </div>
        )}
        </Container>
    )
}