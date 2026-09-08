export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data: T
}

export interface NavItem {
    path: string;
    label: string;
}

export interface TitledText {
    title: string
    text: string
}