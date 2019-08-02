const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    open_id: {
        type: String,
        required: true,
        unique: true
    },
    nick_name: {
        type: String
    },
    avatar_url: {
        type: String
    },
    gender: {
        type: Number,
        default: 0,//0 未知 1 男 2 女
    },
    //用户可以多处登录 每次登录都有不同的token 
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
        timestamps: true
    });

//删除敏感的多余数据
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens

    return userObject;
}


//创建用户token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, "sunnyreader");

    user.tokens = user.tokens.concat({ token })
    await user.save();

    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;