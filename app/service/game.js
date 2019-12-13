'use strict';

const Service = require('egg').Service;
const { BASE_URL, requestHeader, URLS } = require('../static/game_static');


class GameService extends Service {
  async fetchPage() {
    const { ctx } = this;
    try {
    //   const times = 0;
    //   const URLS_L = URLS.length;
      URLS.forEach(async item => {
        const res = await ctx.curl(`${BASE_URL}${item.path}.html`, {
          method: 'GET',
          headers: requestHeader,
        });
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = GameService;
