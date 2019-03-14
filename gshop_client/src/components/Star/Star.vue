<template>
  <div :class="`star star-${size}`">
    <span v-for="(starClass,index) in starsClass" :key="index" :class="`star-item ${starClass}`" ></span>
  </div>
</template>
<script>
  //得到stars 取整数 =》实心星星 'on'
  //小数部分大于0.5 => half
  //off 虚星   总共数量5
  export default {
    props:{
      size:Number,
      stars:Number
    },
    computed:{
      starsClass(){
        let arr=[]
        const stars = this.stars
        const nos = Math.floor(stars)
        for (var i = 0; i < nos; i++) {
          arr.push('on')
        }
        if(stars*10 - nos*10 > 5){
          arr.push('half')
        }
        while (arr.length<5){
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
