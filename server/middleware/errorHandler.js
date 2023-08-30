module.exports = (error, req, res, next) => {
    let code = 500
    let message = "Invalid server error"

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            code = 400
            message = error.errors[0].message;
            break;
        case "emailFalsy":
            code = 400
            message = "Email is required";
            break;
        case "passwordFalsy":
            code = 400
            message = "Password is required";
            break;
        case "JsonWebTokenError":
        case "invalidToken":
            code = 401
            message = "Invalid token";
            break;
        case "userInvalid":
            code = 401
            message = "Invalid email/password";
            break;
        case "NotFound":
            code = 404
            message = "Data not found";
            break;
        case "Unauthorized":
            code = 403
            message = "You are not authorized";
            break;
        case "Paid":
            code = 400
            message = "You already paid";
            break;
    }
    res.status(code).json({ message });
}