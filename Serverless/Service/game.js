const Game = require("../Model/game");

module.exports = {
  findGame: query => {
    let condition = query || {};
    return new Promise((resolve, reject) => {
      Game.findOne(condition, function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  updateGame: data => {
    return new Promise((resolve, reject) => {
      Game.updateOne({ type: data.type }, data, {upsert:true}, function(err, res) {
        if (err) {
          console.log("Error:" + err);
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }
};
