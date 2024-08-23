const { Otp } = require("../models");

const createOtp = async(email) => {
    await Otp.updateMany({email}, {$set: {status: 'inactive'}})
    // Generate OTP
    const generatedCode = Math.floor(1000 + Math.random() * 9000)
    return await Otp.create({
        email,
        otp: generatedCode,
    })
}

module.exports = {
    createOtp
}