/*包含n个直接更新state 方法*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  LOGIN_OUT,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  DECREASE_COUNT,
  INCREASE_COUNT,
  CLEARCART,
  RECEIVE_SEARCH_SHOP
} from './action-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORIES](state, {categories}) {
    state.categories = categories
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [LOGIN_OUT](state){
    //清空userInfo
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREASE_COUNT](state,{food}){
    if(!food.count){ //第一次增加
      Vue.set(food,'count',1) //新增加的属性需要set方法进行数据绑定
      state.cartFoods.push(food) //第一次添加到carfoods
    } else {
      food.count++
    }
  },
  [DECREASE_COUNT](state,{food}){
    if(food.count){
      food.count--
      if(food.count === 0){
        //从cartfoods数组中删除count为零的food
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEARCART](state){
    //将food.count移除或者等于0
    state.cartFoods.forEach((food)=> food.count = 0)
    //清空cartFoods
    state.cartFoods = []
  },
  //异步获取搜索商铺信息
  [RECEIVE_SEARCH_SHOP](state,{searchShops}){
    state.searchShops = searchShops
  }
}
