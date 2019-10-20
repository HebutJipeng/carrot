"use strict";

const Service = require("egg").Service;

const province = require("../static/province")
const industry = require("../static/industry")
class UserService extends Service {
  // 更新用户信息
  async add(data) {
    const { ctx } = this;
    const result = await ctx.model.User.create(data);
    return result;
  }

  async getUserCard(data) {
    let result = []
    if (data.area) {
      const area = province
        .find(item => item.key === data.area)
        .pic.map(
          item => `https://h5-1254352970.cos.ap-beijing.myqcloud.com/${item}.jpg`
        );
      result = [...area]
    }
    if (data.industry) {
      const ind = industry
        .find(item => item.key === data.industry)
        .pic.map(
          item =>
            `https://h5-1254352970.cos.ap-beijing.myqcloud.com/${item}.jpg`
        );
      result = [...result, ...ind];
    }
    console.log(result)
    return result
  }
}
module.exports = UserService;
