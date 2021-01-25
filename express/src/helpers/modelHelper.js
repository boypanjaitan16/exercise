const {url} = require('./appHelper');
const fs    = require('fs')

exports.userParser = async (user, req) => {
    try{
        const obj       = user.toObject()
        const avatar    = await fs.existsSync(`./public/avatar/${obj._id}${obj.avatarExt}`)

        if(avatar){
            obj.avatar  = url(req, `/avatar/${obj._id}${obj.avatarExt}`)
        }

        delete obj['password']
        delete obj['_v']

        return obj
    }
    catch(err){
        console.log('error userParser', err)
        return user
    }
}