import { reactive } from 'vue'
import type { FullResume } from "@/types/resume";
import type { Owner } from "@/types/owner";

class Store {
    private static instance: Store

    ownerData = reactive<Owner>({} as Owner)
    ownerLoaded = false

    resumeData = reactive<FullResume>({} as FullResume)
    resumeLoaded = false

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
        this.resumeData = data
        this.resumeLoaded = true
    }

    getResume(): FullResume | null {
        return this.resumeData
    }

    clearResume() {
        Object.keys(this.resumeData).forEach(key => {
            delete (this.resumeData as any)[key]
        })
    }
}

export const store = Store.getInstance()