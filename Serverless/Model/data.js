const mongoose = require('./db')
const Schema = mongoose.Schema

const DataSchema = new Schema({
    name: {
        type: String
    },
    updateTime: {
        type: String
    },
    data: {
        type: Object
    }
})

module.exports = mongoose.model('Data', DataSchema)
