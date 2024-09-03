export const parseError = (error: any): string => {
    if (error.response?.data) {
        return error.response.data.message || 'An error occurred';
    } else if (error.message) {
        return error.message;
    } else {
        return 'An unknown error occurred';
    }
};