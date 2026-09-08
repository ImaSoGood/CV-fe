import { reactive } from 'vue'
import type { FullResume } from "@/types/resume";
import type { Owner } from "@/types/owner";
import type { WorkResponse } from '@/types/work';

class Store {
    private static instance: Store

    ownerData = reactive<Owner>({} as Owner)
    ownerLoaded = false

    resumeData = reactive<FullResume>({} as FullResume)
    resumeLoaded = false

    workData = reactive<WorkResponse>({} as WorkResponse)
    workLoaded = false

    static getInstance(): Store {
        if (!Store.instance)
            Store.instance = new Store()

        return Store.instance
    }

    getOwner(): Owner {
        return this.ownerData
    }

    setOwner(data: Owner) {
        Object.assign(this.ownerData, data)
        this.ownerLoaded = true
    }

    clearOwner() {
        Object.keys(this.ownerData).forEach(key => {
            delete (this.ownerData as any)[key]
        })
        this.ownerLoaded = false
    }

    setResume(data: FullResume) {
        Object.assign(this.resumeData, data)
        this.resumeLoaded = true
    }

    getResume(): FullResume | null {
        return this.resumeData
    }

    clearResume() {
        Object.keys(this.resumeData).forEach(key => {
            delete (this.resumeData as any)[key]
        })
        this.resumeLoaded = false
    }

    setWork(data: WorkResponse) {
        Object.assign(this.workData, data)
        this.workLoaded = true
    }

    getWork(): WorkResponse | null {
        return this.workData
    }

    clearWork() {
        Object.keys(this.workData).forEach(key => {
            delete (this.workData as any)[key]
        })
        this.workLoaded = false
    }
}

export const store = Store.getInstance()