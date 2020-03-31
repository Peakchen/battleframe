cc.Class({
    extends: cc.Component,

    realrnd: function( seed ){
        seed = ( seed * 9301 + 49297 ) % 233280; //为何使用这三个数: https://www.zhihu.com/question/22818104
        return seed / ( 233280.0 );
    },

    Rand: function( number, seed ){
        //today = new Date(); 
        //seed = today.getTime();
        return Math.ceil( this.realrnd( seed ) * number );
    },

    // is samed to Math.random
    RandOne: function(seed) {
        return Math.ceil( this.realrnd( seed ) * 9999.0 )/10000.0;
    }
})