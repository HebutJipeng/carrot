/* eslint-disable array-callback-return */
'use strict';

const Service = require('egg').Service;
const { BASE_URL, requestHeader, URLS, typeMap } = require('../static/game_static');
const cheerio = require('cheerio');


class GameService extends Service {
  async fetchPage() {
    const { ctx } = this;
    console.log('trigger');
    try {
      // let times = 0;
      // const URLS_L = URLS.length;
      URLS.forEach(async item => {
        const res = await ctx.curl(`${BASE_URL}${item.path}.html`, {
          method: 'GET',
          headers: requestHeader,
          dataType: 'text',
        });
        const parse = await this.parseHtml(res.data, item.name);
        const resFind = await ctx.model.GameUpdateTime.findOne({
          type: item.type,
        });
        if (resFind && resFind.type) {
          if (parse.updateTime.getTime() > resFind.updateTime.getTime()) {
            await ctx.model.GameUpdateTime.update({
              type: item.type }, {
              updateTime: parse.updateTime,
            });
            await ctx.model.GameInfo.insertMany(parse);
            console.log(`${item.type}, 已更新`);
          } else {
            console.log(`${item.type}, 未形成更新`);
          }
          // times++;

          // if (times === URLS_L) {
          //   mongoose.disconnect();
          // }
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async parseHtml(text, name) {
    return new Promise((resolve, reject) => {
      try {
        const $ = cheerio.load(text);

        const gameInfo = $('.table.yxInfo');
        const games = gameInfo.find('tbody').find('.bg-none');
        const result = [];
        games.filter(g => {
          const res_game = {};
          const $div = $(games[g]).find('td').children('div');
          const sections = $div.children('table');
          sections.filter(s => {
            if (!s) {
              const $sectionS = $(sections[s]);
              const title = $sectionS.find('span');
              const titleInfo = [];
              title.filter(t => {
                titleInfo.push($(title[t]).text());
              });
              res_game.title = titleInfo;
              const isNew = $sectionS.find('.right').text() === '[新]';
              res_game.is_new = isNew;
            } else {
              const $sectionS = $(sections[s]);
              const $td = $sectionS.find('td');
              $td.filter(t => {
                if (t === 0) {
                  const src = $($td[0]).find('img').attr('src');
                  res_game.picture = src;
                } else if (t === 2) {
                  const $spans = $($td[2]).find('span');
                  const discount = [];
                  $spans.filter(p => {
                    discount.push($($spans[p]).text().replace(/\s/g, ''));
                  });
                  res_game.platform_data = discount;
                } else if (t === 3) {
                  const $spans = $($td[3]).find('span');
                  let discount = [];
                  $spans.filter(p => {
                    discount = [ ...discount, ...$($spans[p]).text().split(/\s/)
                      .filter(sp => sp) ];
                  });
                  res_game.discount_info = discount;
                }
              });
            }
          });
          const $cell_spans = $div.find('.collapse').children('span');
          const cellInfo = {};
          $cell_spans.filter(ce => {
            if (ce === 0) {
              cellInfo.listDate = $($cell_spans[0]).text().replace('上市日期：', '');
            } else if (ce === 1) {
              const comment = $($cell_spans[1]).text().split(' 好评率 ');
              cellInfo.commentNum = comment[0];
              cellInfo.commentRate = comment[1];
            }
          });
          res_game.product_info = cellInfo;
          const $cell_tabs_trs = $div.find('.collapse').find('.cell_tabs').find('tr');
          let flag = false;
          res_game.platforms = {
            steam: {},
            shanguo: {},
            other: {},
          };
          let app = 'steam';
          $cell_tabs_trs.filter(trs => {
            if ($($cell_tabs_trs[trs]).find('span').hasClass('td_title')) {
              flag = true;
            }

            if (!flag) {
              if (trs % 3 === 0) {
                const $ceil = $($cell_tabs_trs[trs]).find('td');
                $ceil.filter(ci => {
                  if (!ci) {
                    const $a = $($ceil[ci]).find('a');
                    app = $a.text().indexOf('Steam') > -1 ? 'steam' : 'shanguo';
                    res_game.platforms[app].source = $a.attr('href');
                    res_game.platforms[app].name = $a.text();
                  } else {
                    res_game.platforms[app].original_price = $($ceil[ci]).text().replace(/\s/g, '') || null;
                  }
                });
              } else if (trs % 3 === 1) {
                const $ceil = $($cell_tabs_trs[trs]).find('td')[0];
                const te = $($ceil).text();
                res_game.platforms[app].display_text = te.split(/\s/)[0];
                res_game.platforms[app].price = $($ceil).find('b').text();
              } else if (trs % 3 === 2) {
                const $ceil = $($cell_tabs_trs[trs]).find('td');
                $ceil.filter(cc => {
                  if (!cc) {
                    res_game.platforms[app].sales_date = $($ceil[cc]).text();
                  } else {
                    res_game.platforms[app].sales_text = $($ceil[cc]).text();
                  }
                });
              }
            } else {
              if ($($cell_tabs_trs[trs]).find('span').hasClass('td_title')) {
                res_game.platforms.other.name = $($cell_tabs_trs[trs]).find('span').text();
              } else {
                const cell_tr = $($cell_tabs_trs[trs]).find('td');
                !res_game.platforms.other.items && (res_game.platforms.other.items = []);
                const temp = {};
                cell_tr.filter(cl => {
                  if (!cl) {
                    temp.title = $(cell_tr[cl]).text();
                  } else {
                    temp.price = $(cell_tr[cl]).text();
                  }
                });
                temp.title && (res_game.platforms.other.items.push(temp));
              }
            }
          });
          result.push(res_game);
        });

        const updateTime = $($('caption').find('span')[1]).text().split('：')[1];
        resolve({
          name,
          updateTime: new Date(updateTime),
          data: result,
        });
      } catch (error) {
        reject(error);
      }

    });
  }

  async getGame(type) {
    const { ctx } = this;
    // 查某个类型最新一条
    const res = ctx.model.GameInfo.findOne({
      name: typeMap[type],
    }).limit(1).sort({ $natural: -1 });
    return res;
  }
}

module.exports = GameService;
