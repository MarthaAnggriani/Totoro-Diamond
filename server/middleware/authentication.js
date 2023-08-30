const { User } = require("../models");
const { verifyAccessToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers;
        // cek access_token
        if (!access_token) {
            throw { name: "Unauthenticated" };
        }
        let payload = verifyAccessToken(access_token);

        let user = await User.findByPk(payload.id);

        if (!user) throw { name: "Unauthenticated" };
        req.user = { id: user.id, email: user.email };
        next();
    }
    catch (error) {
        next(error);
    }
}

module.exports = authentication;