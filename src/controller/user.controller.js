var { User } = require("../model/user.model.js");
var bcrypt = require("bcrypt");
const Apiresp = require("../utils/Apiresp.js");
const Apierror = require("../utils/ApiError.js");
const {
    generateRefreshToken,
    generateAccessToken,
} = require("../utils/generateToken.js");

const register = async (req, res, next) => {
    try {
        const { name, email, password, contact, profileURL } = req.body;
        const provider = "email/password";

        // Validating name,email,password
        if (
            [name, email, contact, password].some((field) => {
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

module.exports = { register, login };
