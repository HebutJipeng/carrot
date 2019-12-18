'use strict';

const Subscription = require('egg').Subscription;
const IS_PROD = process.env.NODE_ENV === 'production';

class FetchData extends Subscription {
  static get schedule() {
    return {
      interval: '1h',
      type: 'all',
      disable: !IS_PROD,
    };
  }
  async subscribe() {
    const { ctx } = this;
    await ctx.service.game.fetchPage();
  }
}

module.exports = FetchData;
