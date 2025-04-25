 export class ApiError extends Error{
    constructor(statusCode,message = "error occued",error){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.success = false;

    }
}