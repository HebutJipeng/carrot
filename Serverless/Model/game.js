const mongoose = require('./db.js'),
    Schema = mongoose.Schema;

let GameSchema = new Schema({          
    type : { type: String },                    // 表类型
    updateTime: {type: Date},                        //更新日期
});

module.exports = mongoose.model('Game', GameSchema);