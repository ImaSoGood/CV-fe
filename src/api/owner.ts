import api from '@/services/api'
import type { ApiResponse } from '@/types/common'
import type { Owner } from '@/types/owner'

export async function getOwnerData(): Promise<ApiResponse<Owner>> {
    return await api.get('/owner') as unknown as ApiResponse<Owner>
}