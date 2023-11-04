export enum StatusEnum {
    LOADING = 'Loading',
    SUCCESS = 'Success',
    ERROR = 'Error'
}

export interface UserSliceState {
    userNumber: null | number;
    isLoading: boolean;
    status: string;
}