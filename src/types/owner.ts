export interface Owner {
    name: string
    position: string
    about?: string
    picture_url?: string
    achivements?: Achivements[]
    contacts: Contact[]
}

export interface Contact {
    platform: string
    link: string
    text: string
}

export interface Achivements {
    caption?: string
    ico_url?: string
    text?: string
}