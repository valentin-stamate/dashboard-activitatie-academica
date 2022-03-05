export interface BaseInformation {
    id: number;
    fullName: string;
    identifier: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: number;
    identifier: number;
    email: string;
    alternativeEmail: string;
    admin: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export interface UserKey {
    id: number;
    identifier: string;
    key: string;

    createdAt: Date;
    updatedAt: Date;
}