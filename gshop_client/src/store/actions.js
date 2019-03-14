/*包含n个间接更新state方法*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  LOGIN_OUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREASE_COUNT,
  DECREASE_COUNT,
  CLEARCART,
  RECEIVE_SEARCH_SHOP
} from './action-types'
import {
  reqAddress,
  reqFoodsCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShops
} from '../api'
export default {
  //获取地址信息
  async getAddress({commit, state}) {
    const {longitude, latitude} = state
    const geohash = latitude + ',' + longitude
    //发送ajax请求
    const result = await reqAddress(geohash)
    //发送成功得到数据
    console.log(result)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //获取食物种类信息
  async getCategories({commit}) {
    //发送ajax请求
    const result = await reqFoodsCategories()
    //发送成功得到数据
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },
  //获取商铺信息
  async getShops({commit, state}) {
    const {longitude, latitude} = state
    //发送ajax请求
    const result = await reqShops({longitude, latitude})
    //发送成功得到数据
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  //保存用户信息
  getUserInfo({commit, state}) {
    const userInfo = state.userInfo
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  //实现自动登陆
  async userInfoGet({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  //退出登录
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(LOGIN_OUT)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },
// 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      //执行回调函数
      callback && callback()
    }
  },
// 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      //执行回调函数
      callback && callback()
    }
  },
  //同步更新count
  updateCount({commit}, {isAdd,food}) {
    if (isAdd) {
      //增加
      commit(INCREASE_COUNT,{food})
    } else {
      commit(DECREASE_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCart({commit}){
    commit(CLEARCART)
  },
  //异步获取搜索商铺信息
  async getSerachShops({commit,state},keyword){
    const {longitude, latitude} = state
    const geohash = latitude + ',' + longitude
    const result = await reqSearchShops(geohash,keyword)
    if(result.code === 0){
      const searchShops = result.data
        commit(RECEIVE_SEARCH_SHOP,{searchShops})
    }

  }
}
