"use strict";
cc._RF.push(module, 'd36e5DJLYRPSYxoKddtNFw3', 'api');
// scripts/api.js

"use strict";

cc.Class({
  "extends": cc.Component,
  realrnd: function realrnd(seed) {
    seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数: https://www.zhihu.com/question/22818104

    return seed / 233280.0;
  },
  Rand: function Rand(number, seed) {
    //today = new Date(); 
    //seed = today.getTime();
    return Math.ceil(this.realrnd(seed) * number);
  },
  // is samed to Math.random
  RandOne: function RandOne(seed) {
    return Math.ceil(this.realrnd(seed) * 9999.0) / 10000.0;
  }
});

cc._RF.pop();