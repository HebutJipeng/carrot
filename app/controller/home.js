'use strict';

const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')

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
      mobile: { type: "string" },
      company: { type: "string" },
      area: { type: "string" },
      industry: { type: "string", required: false }
    };
    ctx.validate(userRule, ctx.request.body);
    const res = await this.ctx.service.user.add(ctx.request.body)
    const res_pic = await ctx.service.user.getUserCard(ctx.request.body)
    ctx.helper.success({ ctx, res: res_pic })
  }

  async form() {
    const title = 'AI视界 享未来'
    await this.ctx.render('index', {
      title
    })
  }

  read(dir) {
    return new Promise((resolve,reject)=>{
        fs.readFile(dir,'utf-8',(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
  }

  async web() {
    const tpl = path.join(this.config.static.dir, "index.html");
    this.ctx.body = await this.read(tpl);
  }
}

module.exports = HomeController;
