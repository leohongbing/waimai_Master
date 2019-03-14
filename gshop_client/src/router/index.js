/*创建路由器*/
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// import Msite from '../pages/Msite/Msite'
// // import Order from '../pages/Order/Order'
// // import Profile from '../pages/Profile/Profile'
// // import Search from '../pages/Search/Search'
// // import Login  from '../pages/Login/Login'
const Msite = () => import( '../pages/Msite/Msite')
const Profile = () => import( '../pages/Profile/Profile')
const Search = () => import( '../pages/Search/Search')
const Login = () => import( '../pages/Login/Login')
const Order = () => import( '../pages/Order/Order')


import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
export default new VueRouter({
  routes:[
    {
      path:'/',
      redirect:'/msite' /*配置默认路由*/
    },
    {
      path:'/msite',
      component: Msite,
      meta:{
        footerShow:true
      }
    },
    {
      path:'/order',
      component: Order,
      meta:{
        footerShow:true
      }
    },
    {
      path:'/profile',
      component: Profile,
      meta:{
        footerShow:true
      }
    },
    {
      path:'/search',
      component: Search,
      meta:{
        footerShow:true
      }
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/shop',
      component: Shop,
      children:[
        {
          path:'/shop/shopgoods',
          component: ShopGoods,
        },{
          path:'/shop/shoprating',
          component: ShopRating,
        },{
          path:'/shop/shopinfo',
          component: ShopInfo,
        },
        {
          path:'',
          redirect: '/shop/shopgoods'
        }
      ]
    },

  ]
})
