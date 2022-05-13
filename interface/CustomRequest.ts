import { JwtHeader } from "jsonwebtoken";

export interface CustomRequest<T> {
    body: T;
}

export interface User {
    email: string;
    password: string;
}

export interface NewUser extends User {
    name: string;
}

export interface Renew {
    name: string;
    uid: string;
}
