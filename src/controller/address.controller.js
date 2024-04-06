var { Address } = require("../model/address.model.js");
const Apierror = require("../utils/ApiError.js");
const Apiresp = require("../utils/Apiresp.js");

const newAddress = async (req, res) => {
    const { country, state, district, city, zipcode, landmark } = req.body;

    if (
        [country, state, district, city, zipcode, landmark].some((field) => {
            return field === "";
        })
    ) {
        return res.status(405).json(new Apierror(405, "Insufficient data"));
    }

    try {
        const address = await Address.create({
            country,
            state,
            district,
            city,
            zipcode,
            landmark,
            user: req.user,
        });
        return res
            .status(200)
            .json(new Apiresp(200, address, "New address added"));
    } catch (error) {
        return res.status(500).json(new Apierror(500, "Something went wrong"));
    }
};

const updateAddress = async (req, res) => {
    const { country, state, district, city, zipcode, landmark } = req.body;

    try {
        const address = await Address.updateOne(
            { user: req.user },
            { country, state, district, city, zipcode, landmark }
        );
        return res.status(202).json(new Apiresp(202,address,"Address updated"))
    } catch (error) {
        return res
            .status(500)
            .json(new Apierror(500, "Something went wrong updating address"));
    }
};

module.exports = { newAddress, updateAddress };
