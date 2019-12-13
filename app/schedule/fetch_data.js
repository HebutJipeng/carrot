'use strict';

const Subscription = require('egg').Subscription;

class FetchData extends Subscription {
  static get schedule() {
    return {
      interval: '5s',
      type: 'all',
      disable: true,
    };
  }
  async subscribe() {
    console.log('trigger');
    const { ctx } = this;
    console.log(await ctx.model.GameUpdateTime);
  }
}

module.exports = FetchData;
