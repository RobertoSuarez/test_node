import { User } from "../user/user.types";


export interface LoginResponse {
    token: string;
    user:  User;
}

