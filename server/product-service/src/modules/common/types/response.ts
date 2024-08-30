export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface UserModel {
    user_id?: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    user_type: "BUYER" | "SELLER";
    first_name?: string;
    last_name?: string;
    profile_pic?: string;
    verification?: string;
    expiry?: boolean;
  }
