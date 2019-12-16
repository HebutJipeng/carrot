'use strict';

const Controller = require('egg').Controller;

const idRules = {
  id: {
    type: 'enum',
    values: [ 'steam', 'hot', 'hot_chinese', 'hot_history', 'hot_chinese_history' ],
  },
};

class GameController extends Controller {
  async index() {
    console.log('game list');
  }

  async show() {
    const { ctx } = this;
    ctx.validate(idRules, { id: ctx.params.id });
    const res = await ctx.service.game.getGame(ctx.params.id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = GameController;
