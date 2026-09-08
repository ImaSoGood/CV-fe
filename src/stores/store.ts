import { reactive } from 'vue'
import type { FullResume } from "@/types/resume";
import type { Owner } from "@/types/owner";
import type { WorkResponse } from '@/types/work';
import type { ExperienceResponse } from '@/types/experience';

class Store {
    private static instance: Store

    ownerData = reactive<Owner>({} as Owner)
    ownerLoaded = false

    resumeData = reactive<FullResume>({} as FullResume)
    resumeLoaded = false

    workData = reactive<WorkResponse>({} as WorkResponse)
    workLoaded = false

    experienceData = reactive<ExperienceResponse>({} as ExperienceResponse)
    experienceLoaded = false

    static getInstance(): Store {
        if (!Store.instance)
            Store.instance = new Store()

        return Store.instance
    }
    /*
    * owner
    */
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
    /*
    * resume
    */
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
    /*
    * work
    */
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
    /*
    * ExperienceResponse
    */
    setExperience(data: ExperienceResponse) {
        Object.assign(this.experienceData, data)
        this.experienceLoaded = true
    }

    getExperience(): ExperienceResponse | null {
        return this.experienceData
    }

    clearExperience() {
        Object.keys(this.experienceData).forEach(key => {
            delete (this.experienceData as any)[key]
        })
        this.experienceLoaded = false
    }
}

export const store = Store.getInstance()