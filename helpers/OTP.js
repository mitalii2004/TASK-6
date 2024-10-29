const twilio = require('twilio');
const otpManager = require("node-twillo-otp-manager")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_SERVICE_SID
);

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send OTP
const sendOTP = async (phone) => {
    try {
        return await otpManager.sendOTP(phone);
    } catch (error) {
        throw new Error("Invalid phone number: " + error.message);
    }
};

// Verify OTP
const verifyOTP = async (mobileNumber, otp) => {
    try {
        return await otpManager.verifyOTP(mobileNumber, otp);
    } catch (error) {
        throw new Error("Failed to verify OTP: " + error.message);
    }
};

// Send SMS using Twilio
const sendSMS = async (to, body) => {
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    if (!fromNumber) {
        throw new Error("TWILIO_PHONE_NUMBER is not set");
    }

    try {
        return await client.messages.create({
            body,
            from: fromNumber,
            to,
        });
    } catch (error) {
        throw new Error("Failed to send SMS: " + error.message);
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
    sendSMS,
};