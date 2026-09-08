export interface Work {
    title: string,
    text: string,
}

export interface Technology {
    title: string,
    description: string,
    items: string[]
}

export interface WorkResponse {
    work: Work[]
    technology: Technology[]
}