const Models = require("../models/index");
const Joi = require('joi');
const helper = require('../helpers/commonHelpers.js');
const otpManager = require('../helpers/OTP.js');

module.exports = {
    register: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                countryCode: Joi.string().required(),
                phoneNumber: Joi.string().required(),
            });

            const payload = await helper.validationJoi(req.body, schema);

            const objToSave = {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phoneNumber: `${payload.countryCode}${payload.phoneNumber}`,
                profilePic: req.file ? req.file.path : null,
            };

            console.log("Sending OTP to:", objToSave.phoneNumber);

            const otp = await otpManager.sendOTP(objToSave.phoneNumber);

            await otpManager.sendSMS(objToSave.phoneNumber, `Your OTP is: ${otp}`);

            const user = await Models.userModel.create(objToSave);
            await Models.otpModel.create({ userId: user.id, otp });

            return res.status(201).send({ message: "User registered successfully", user });
        } catch (error) {
            console.error("Registration error:", error);
            return res.status(500).send({ error: error.message || "An error occurred during registration." });
        }
    },
};
