export interface Owner {
    name: string
    position: string
    contacts: Contact[]
}

export interface Contact {
    platform: string
    link: string
    text: string
}