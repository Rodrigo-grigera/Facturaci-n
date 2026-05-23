
export interface responseDTO<T>{
    message : string;
    code: number;
    data ? : T | T[]
}