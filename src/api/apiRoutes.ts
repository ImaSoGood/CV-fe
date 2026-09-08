import api from '@/services/api'
import type { ApiResponse } from '@/types/common'
import type { FullResume } from '@/types/resume'
import type { Owner } from '@/types/owner'
import type { WorkResponse } from '@/types/work'

export async function getResumeData(): Promise<ApiResponse<FullResume>> {
    return await api.get('/resume') as unknown as ApiResponse<FullResume>
}

export async function getOwnerData(): Promise<ApiResponse<Owner>> {
    return await api.get('/owner') as unknown as ApiResponse<Owner>
}

export async function getWorkData(): Promise<ApiResponse<WorkResponse>> {
    return await api.get('/work') as unknown as ApiResponse<WorkResponse>
}