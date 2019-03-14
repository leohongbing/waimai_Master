<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=!loginWay">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=!loginWay">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled=!getPhone class="get_verification" :class="{codePhone: getPhone}" @click.prevent="getCode">
                {{countDown>0? `已发送${countDown}s`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}" >
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="isShow">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" @click="isShow=!isShow" :class="isShow? 'on':'off'">
                  <div class="switch_circle" :class="isShow? 'on':''"></div>
                  <span class="switch_text">{{isShow? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="CaptchaPic">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="alertText"/>
  </section>
</template>
<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import { reqSendCode,reqCaptchaLogin,reqSmsLogin } from '../../api'
  import { mapState } from 'vuex'
  export default {
    data(){
      return{
        loginWay:true, //切换登陆方式
        phone:'',//手机号
        code:'',//验证码
        countDown:0, //倒计时
        alertText:'',//提示框文本内容
        name:'',//用户名
        pwd:'',//密码
        captcha:'',//验证码
        isShow:false
      }
    },
    methods:{
      async getCode(){
        //短信倒计时
        if(this.countDown === 0){
          //倒计时30s
          this.countDown = 30
          this.intervalId = setInterval(()=>{
            this.countDown--
            //当倒计时等于0停止计时
            if(!this.countDown){
              clearInterval(this.intervalId)
            }
          },1000)
          //发送异步ajax请求获取code
          const result = await reqSendCode(this.phone)
          //发送失败
          if(result.code === 1){
            //显示提示消息
            this.alertText = result.msg
            //清楚定时器
            clearInterval(this.intervalId)
            this.countDown=0
          }else {//发送成功
            console.log('发送成功')
          }
        }
      },
      async login(){
        let result
        //表单前台验证
        const { getPhone,phone,code,name,pwd,captcha } = this
        if(this.loginWay){//第一种登陆方式
          if(!phone){
            //号码不能为空
            this.alertText='号码不能为空'
            return
          }else if(!getPhone){
            //号码不正确
            this.alertText='号码不正确'
            return
          }else if(!code){
            //验证码不能为空
            this.alertText='验证码不能为空'
            return
          }
          //手机验证码登陆
          result = await reqSmsLogin(phone,code)
          this.responseGet(result)
        }else {//第二种登陆方式
          if(!name){
            //用户名不能为空
            this.alertText='用户名不能为空'
          }else if(!pwd){
            //密码不能为空
            this.alertText='密码不能为空'
          }else if(!captcha){
            //验证码不能为空
            this.alertText='验证码不能为空'
          }
          //验证码登陆
          result = await reqCaptchaLogin({name,pwd,captcha})
          this.responseGet(result)
        }
        //后台验证
      },
      responseGet(result){
        if(result.code === 0){
          //登陆成功保存userInfo
          this.$store.state.userInfo = result.data
          console.log(this.userInfo)
          //登陆成功跳转到个人中心
          this.$router.replace('/profile')
        }else {
          //登陆失败显示提示消息
          this.alertText=result.msg
          //更新验证码
          this.getCaptcha()
        }
      },
      closeTip(){
        this.alertText=''
      },
      //获取一次性验证码
      getCaptcha(){
        //改变目标img src 实现重新获取验证码
        if(this.$refs.CaptchaPic.src){
          this.$refs.CaptchaPic.src = 'http://localhost:4000/captcha?time='+ Date.now()
        }
      }
    },
    computed:{
      //使用正则判断手机号码是否合法
      getPhone(){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
      },
      ...mapState(['userInfo'])
    },
    components:{AlertTip}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.codePhone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.on
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
