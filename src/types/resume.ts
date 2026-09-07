export interface ResumeItem {
    company: string
    position: string
    period: string
    description: string
    works: string[]
}

export interface FullResume {
    resume: ResumeItem[]
}
