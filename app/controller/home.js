'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async testMongo() {
    const { ctx } = this;
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://140.143.193.74:27017/tiandy');
    const con = mongoose.connection;
    con.on('error', console.error.bind(console, '连接数据库失败'));
    con.once('open', () => {
      console.log('连接成功');
    });
    ctx.body = '测试连接';
  }

  async testAdd() {
    this.ctx.body = this.ctx.service.user.add();
  }

  async create() {
    const { ctx } = this
    const userRule = {
      name: { type: "string" },
      mobile: { type: "number" },
      company: { type: "string" },
      area: { type: "number" },
      industry: { type: "string", required: false }
    };
    ctx.validate(userRule, ctx.request.body);
    this.ctx.service.user.add(ctx.request.body)
    ctx.body = ctx.request.body;
  }

  async form() {
    const title = 'AI视界 享未来'
    await this.ctx.render('index', {
      title
    })
  }
}

module.exports = HomeController;
