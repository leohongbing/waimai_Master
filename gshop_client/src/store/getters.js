/*包含n个state方法属性*/
export default {
  totalCount(state){
    return state.cartFoods.reduce((pretotal,food)=>pretotal + food.count ,0)
  },
  totalPrice(state){
    return state.cartFoods.reduce((pretotal,food)=>pretotal + food.count*food.price ,0)
  }
}
