const mongoose  = require('mongoose')
const Schema    = mongoose.Schema
const categorySchema    = new Schema({
    user  : {
        required    : true,
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    name    : {
        required    : true,
        type        : String
    },
    description     : {
        required    : false,
        type        : String
    },
    activities : [
        {
            type: Schema.Types.ObjectId,
            ref :'Activity'
        }
    ]
}, {
    timestamps  : true
})

const Category  = mongoose.model('Category', categorySchema)

module.exports  = Category