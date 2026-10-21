export interface Work {
    title: string,
    text: string,
}

export interface Technology {
    title: string,
    description: string,
    show_home: boolean | null,
    items: string[]
}

export interface WorkResponse {
    work: Work[]
    technology: Technology[]
}