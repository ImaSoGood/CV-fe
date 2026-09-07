import api from '@/services/api'
import type { ApiResponse } from '@/types/common'
import type { FullResume } from '@/types/resume'

export async function getResumeData(): Promise<ApiResponse<FullResume>> {
    return await api.get('/resume') as unknown as ApiResponse<FullResume>
}