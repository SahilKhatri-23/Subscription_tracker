// Create a subscription --> middleware(checks for errors in the request body) ... can have multiple middlewares --> next() --> controller(which has the logic to create a subscription)

const errorMiddleware = (err, req, res, next) => {
  try{
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    //Now we will handle different types of errors and send appropriate responses to the client
    //Mongoose Bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new Error(message);
        error.statusCode = 404;
    }

    //Mongoose Duplicate Key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new Error(message);
        error.statusCode = 400;
    }

    //Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new Error(message.join(", "));
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
  } 
  
  catch (error) {
    next(error);
  }
}

export default errorMiddleware;