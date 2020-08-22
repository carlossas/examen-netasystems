
export interface Usuario {
    id?: number,
    name: string,
    user: string,
    password: string,
    admin: boolean,
    id_register?: number,
    language: string,
    email: string,
    position: string,
    telephone: number,
    user_register?: Usuario
}

