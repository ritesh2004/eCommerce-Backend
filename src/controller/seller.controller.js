var { User } = require("../model/user.model.js");
var bcrypt = require("bcrypt");
const Apiresp = require("../utils/Apiresp.js");
const Apierror = require("../utils/ApiError.js");
const {
    generateRefreshToken,
    generateAccessToken,
} = require("../utils/generateToken.js");
var jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const { name, email, password, contact, profileURL, products } =
            req.body;
        const provider = "email/password";

        // Validating name,email,password
        if (
            [name, email, contact, password, products].some((field) => {
                return field?.trim === "";
            })
        ) {
            return res.status(402).json(new Apierror(402, "Insufficient data"));
        }

        // Chaecking for exsisting data
        const user = await User.findOne({
            $or: [{ email }, { contact }],
        });
        if (user) {
            return res
                .status(403)
                .json(new Apierror(403, "User already exists"));
        }

        // Else
        const hashedPass = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPass,
            contact,
            profileURL,
            provider,
            products,
        });

        const createdUser = await User.findOne({ email });

        return res
            .status(200)
            .json(
                new Apiresp(200, createdUser, "User registered successfully")
            );
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validating email and password
        if (!email && !password) {
            return res.status(402).json(new Apierror(402, "Insuffisient data"));
        }

        // Checking if user exist or not
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json(new Apierror(404, "User not found"));
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json(new Apierror(403, "Invalid password"));
        }

        const loggedUser = await User.findOne({ email });
        const refreshToken = generateRefreshToken(loggedUser._id);
        const accessToken = generateAccessToken(
            loggedUser._id,
            loggedUser.email,
            loggedUser.name,
            loggedUser.profileURL
        );
        await User.updateOne({ email }, { refreshToken });

        const options = {
            secure: true,
            httpOnly: true,
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(new Apiresp(200, loggedUser, "Logged in successfully"));
    } catch (error) {
        return res.status(500).json(new Apierror(500, "Something went wrong"));
    }
};

const getUser = async (req, res, next) => {
    return res
        .status(200)
        .json(new Apiresp(200, req.user, "User found successfully"));
};

const logout = async (req, res, next) => {
    req.user = null;
    return res
        .status(201)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new Apiresp(201, req.user, "User logged out successfully"));
};

const getAccessToken = async (req, res, next) => {
    // Extracting access token
    const { refreshToken } = req.cookie;

    // If refresh token not found
    if (!refreshToken) {
        return res.status(401).json(new Apierror(401, "Unauthorized request"));
    }

    // Validating refresh token
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

        // Checking for user
        const user = await User.findById(decoded?.id);

        if (!user) {
            return res
                .status(404)
                .json(new Apierror(404, "Invalid refresh token"));
        }

        // Checking incoming refresh token with refresh token saved in database
        if (refreshToken !== user.refreshToken) {
            return res
                .status(403)
                .json(new Apierror(403, "Refresh token expired"));
        }

        const options = {
            secure: true,
            httpOnly: true,
        };

        const accessToken = generateAccessToken(
            user._id,
            user.email,
            user.name,
            user.profileURL
        );
        const newRefreshToken = generateRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new Apiresp(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "New Accesstoken generated"
                )
            );
    } catch (error) {
        return res.status(500).json(new Apierror(500, "Something went wrong!"));
    }
};

module.exports = { register, login, getUser, logout, getAccessToken };
