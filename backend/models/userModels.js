const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userModels = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        default: ""
    }

},
    {
        timestamps: true
    }
);

userModels.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

userModels.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});




const User = mongoose.model("User", userModels)


module.exports = User