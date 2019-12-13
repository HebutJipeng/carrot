'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameUpdateTimeSchema = new Schema({
    type: { type: String }, // 表类型
    updateTime: { type: Date },
  });
  return mongoose.model('Data', GameUpdateTimeSchema);
};
