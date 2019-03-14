<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.footerShow"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqFoodsList} from './api'

  export default {
     mounted(){
       this.$store.dispatch('getAddress');
       this.$store.dispatch('userInfoGet')
    },
    components:{FooterGuide}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
