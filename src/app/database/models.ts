export interface EmailResult {
    email: string;
    success: boolean;
}

export interface AllowedStudent {
    id?: number;

    fullName: string;
    identifier: string;
    attendanceYear: number;
    coordinator: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface Student {
    id?: number;

    identifier: string;
    fullName: string;
    email: string;
    alternativeEmail: string;
    attendanceYear: number;
    coordinatorName: string;
    coordinatorFunction: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface Coordinator {
    id?: number;

    name: string;
    function: string;
    email: string;
    password: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface Admin {
    id?: number;

    username: string;
    email: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthorizationKey {
    id?: number;

    key: string;

    createdAt?: Date;
    updatedAt?: Date;
}