/*模拟接口数据Mockjs 拦截Ajax请求 返回模拟数据（代理服务器与之类似  拦截ajax请求，向服务器发送请求，解决跨域问题）*/
import Mock from 'mockjs'
import data from './data'


//Mock.mock( rurl, template )
// 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/info',{code:0,data:data.info})
Mock.mock('/ratings',{code:0,data:data.ratings})
