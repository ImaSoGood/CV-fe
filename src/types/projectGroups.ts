export interface Group {
    name: string
    header: string
    text: string
    projects: Project[]
}

export interface Project {
    name: string
    text: string
    picture_url: string | null
    show_home: boolean | null
}

export interface GroupResponse {
    groups: Group[]
}