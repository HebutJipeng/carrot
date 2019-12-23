"use strict";
const request = require("async-request");
const request_header = require("./utils/request_header");
const parseHtml = require("./utils/parse_html");
const URLS = require("./utils/urls");
const mongoose = require("./Model/db")

const { findGame, updateGame } = require("./Service/game");
const { insertData } = require("./Service/data");

const BASE_URL = "https://www.yxdzqb.com/";

const httpRequest = path => {
  return new Promise(async resolve => {
    const res = await request(`${BASE_URL}${path}.html`, {
      headers: request_header
    });
    resolve(res);
  });
};

exports.main_handler = async (event, context, callback) => {
  // request module
  try {
    let times = 0
    const URLS_L = URLS.length
    URLS.forEach(async item => {
      const res = await httpRequest(item.path);
      // parse module
      const parse = await parseHtml(res.body, item.name);
      const resFind = await findGame({
        type: item.type
      });
      if (resFind && resFind.type) {
        if (parse.updateTime.getTime() > resFind.updateTime.getTime()) {
          const resUpdate = await updateGame({
            type: item.type,
            updateTime: parse.updateTime
          });
          const resInsert = await insertData(parse);
        } else {
          console.log(`${item.type}, 未形成更新`);
        }
        times++;
        
        if (times === URLS_L) {
          mongoose.disconnect() 
        }
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
