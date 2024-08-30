import { ApiResponse } from '../types/response';

export const successResponse = <T>(data: T, message: string = 'Request successful'): ApiResponse<T> => {
    return {
        success: true,
        data,
        message
    };
};

export const errorResponse = (error: string, message: string = 'Request failed'): ApiResponse<null> => {
    return {
        success: false,
        error,
        message
    };
};
