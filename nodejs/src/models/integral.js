//积分明细表
const mongoose = require('mongoose');

const IntegralSchema = new mongoose.Schema({
    description: {
        type: String
    },
    //积分变动
    integral: {
        type: String
    },
    //用户ID
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
        timestamps: true
    })

const Integral = mongoose.model('Integral', IntegralSchema);



module.exports = Integral;