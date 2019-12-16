'use strict';

module.exports = {
  BASE_URL: 'https://www.yxdzqb.com/',
  requestHeader: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh,ja;q=0.9,ru;q=0.8,de;q=0.7,en-US;q=0.6,en;q=0.5,zh-TW;q=0.4,id;q=0.3,es;q=0.2,pt;q=0.1,th;q=0.1,hi;q=0.1,it;q=0.1,zh-CN;q=0.1,ko;q=0.1',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    Cookie: '_ga=GA1.2.1356763290.1575543013; _gid=GA1.2.1418529254.1575543013',
    Host: 'www.yxdzqb.com',
    Referer: 'https://www.yxdzqb.com/index3.html',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
  },
  URLS: [
    {
      path: 'index_r',
      name: 'Steam 最新折扣',
      type: 'steam',
    },
    {
      path: 'index1',
      name: '热门游戏折扣',
      type: 'hot',
    },
    {
      path: 'index_1c',
      name: '热门中文游戏折扣',
      type: 'hot_chinese',
    },
    {
      path: 'index2',
      name: '热门游戏历史低价',
      type: 'hot_history',
    },
    {
      path: 'index_2c',
      name: '中文游戏历史低价',
      type: 'hot_chinese_history',
    },
  ],
  typeMap: {
    steam: 'Steam 最新折扣',
    hot: '热门游戏折扣',
    hot_chinese: '热门中文游戏折扣',
    hot_history: '热门游戏历史低价',
    hot_chinese_history: '中文游戏历史低价',
  },
};

