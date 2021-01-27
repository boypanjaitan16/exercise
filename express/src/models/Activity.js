const mongoose  = require('mongoose')

const Schema    = mongoose.Schema

const activitySchema    = new Schema({
    user  : {
        required    : true,
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    category  : {
        required    : false,
        type        : Schema.Types.ObjectId,
        ref         : 'Category'
    },
    name    : {
        required    : true,
        type        : String
    },
    description     : {
        required    : false,
        type        : String
    },
    timeStart   : {
        required    : false,
        type        : Date
    },
    timeEnd     : {
        required    : false,
        type        : Date
    }
}, {
    timestamps  : true
})

const Activity  = mongoose.model('Activity', activitySchema)

module.exports  = Activity