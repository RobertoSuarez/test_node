export interface User {
    id:       number;
    username: string;
    email:    string;
    rol:      Rol;
}

export interface Rol {
    id:      number;
    rolName: string;
}
