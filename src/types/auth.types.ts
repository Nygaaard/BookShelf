export interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    createdAt: string
}

export interface LoginCredentials {
    username: string,
    password: string
}

export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    register: (credentials: LoginCredentials) => Promise<void>;
}