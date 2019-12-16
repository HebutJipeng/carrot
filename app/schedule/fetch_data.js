'use strict';

const Subscription = require('egg').Subscription;

class FetchData extends Subscription {
  static get schedule() {
    return {
      interval: '1h',
      type: 'all',
    };
  }
  async subscribe() {
    const { ctx } = this;
    await ctx.service.game.fetchPage();
  }
}

module.exports = FetchData;
