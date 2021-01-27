const mongoose  = require('mongoose')

const Schema = mongoose.Schema;

const userSchema    = new Schema({
    email    : {
        required    : true,
        trim        : true,
        type        : String,
        unique      : true
    },
    name    : {
        required    : true,
        type        : String
    },
    password    : {
        required    : true,
        type        : String
    },
    avatarExt   : {
        required    : false,
        type        : String
    },
    activities : [
        {
            type: Schema.Types.ObjectId,
            ref :'Activity'
        }
    ],
    categories  : [
        {
            type    : Schema.Types.ObjectId,
            ref : 'Category'
        }
    ]
}, {
    timestamps  : true
})

const User  = mongoose.model('User', userSchema)

module.exports  = User