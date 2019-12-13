'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GameInfoSchema = new Schema({
    name: {
      type: String,
    },
    updateTime: {
      type: String,
    },
    data: {
      type: Object,
    },
  });
  return mongoose.model('Game', GameInfoSchema);
};
