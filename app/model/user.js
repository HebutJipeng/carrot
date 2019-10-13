"use strict";

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    industry: {
      type: String
    }
  });
  return mongoose.model("User", UserSchema);
};
