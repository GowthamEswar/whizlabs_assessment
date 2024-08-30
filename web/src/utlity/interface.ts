export interface textFieldProp {
    name: string;
    register: any;
    error: any;
    placeholder: string;
    className: string;
    disable?: boolean;
    type?: string;
}

export interface signInType {
    email: string;
    password: string;
}

export interface signUpType {
    email: string;
    password: string;
    phone: string;
}