const mongoose  = require('mongoose')

const Schema    = mongoose.Schema

const activitySchema    = new Schema({
    userId  : {
        required    : true,
        type        : String
    },
    name    : {
        required    : true,
        type        : String
    },
    description     : {
        required    : true,
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