import { NextFunction, Response, Request } from "express";

const handleErrors = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const mongoStatusCode = 400
    if (err.code === 11000) {
        return res.status(mongoStatusCode).json({message :"Duplicated field values"})
    }
    else if(err.name === "CastError") {
        return res.status(mongoStatusCode).json({message : "Resources ID is invalid"})
    }
    else if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val: any) => val.message).join(", ")
        return res.status(mongoStatusCode).json({message : message})
    }
    res.status(statusCode).json({
        success: false,
        message: err.message
    });
};

export default handleErrors;