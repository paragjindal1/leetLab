 export class ApiError extends Error{
    constructor(statusCode,errorMessage = "error occued",error){
        super(errorMessage)
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.error = error;
        this.success = false;

    }
}