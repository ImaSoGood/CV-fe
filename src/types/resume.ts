/*export interface FullResume {
    resume: Resume
    works?: ResumeWorks[]
}

export interface Resume {
    company: string
    position: string
    description: string
}

export interface ResumeWorks {
    works: string
}
*/

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
