import type { Experience, ExperienceResponse } from "./experience";
import type { Owner } from "./owner";
import type { Group, Project } from "./projectGroups";
import type { FullResume, ResumeItem } from "./resume";
import type { Technology, Work, WorkResponse } from "./work";

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

export interface AllData {
    owner?: Owner
    resume?: ResumeItem[]
    work?: Work[]
    technology?: Technology[]
    experience?: Experience[]
    groups?: Group[]
}

export type AllDataResponse = AllData[]