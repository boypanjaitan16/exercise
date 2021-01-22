const mongoose  = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const {MONGO_DB, MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD}    = process.env

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}?connectTimeoutMS=1000&bufferCommands=false&authSource=admin`

mongoose.connect(uri, options)
    .then(() => {
        console.log('MongoDB connected succesfully')
    })
    .catch(err => {
        console.log('Error connectiong to MongoDB', err)
    })
