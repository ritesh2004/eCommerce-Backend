var jwt = require("jsonwebtoken");

const generateAccessToken = (id, email, name, photoURL) => {
    return jwt.sign(
        {
            id,
            email,
            name,
            photoURL,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIREIN,
        }
    );
};

const generateRefreshToken = (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIREIN,
        }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
