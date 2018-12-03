/*
包含n个用来间接更新状态数据的方法的对象
 */
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

import {
  reqShops,
  reqFoodCategorys,
  reqAddress,
  reqUser,
  reqLogout,
  reqInfo,
  reqRatings,
  reqGoods
} from '../api'

export default {

  // 获取商家列表的异步action
  async getShops({commit, state}) {
    const {longitude, latitude} = state
    // 1. 发送异步ajax请求
    const result = await reqShops(longitude, latitude)  // {code: 0, data: shops}
    // 2. 根据结果提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})  // action提交给mutation的是包含数据的对象, 而不数据本身
    }
  },

  // 获取食品分类列表的异步action
  async getCategorys({commit}) {
    // 1. 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 2. 根据结果提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})  // action提交给mutation的是包含数据的对象, 而不数据本身
    }
  },

  // 获取地址信息的异步action
  async getAddress({commit, state}) {
    const {longitude, latitude} = state
    // 1. 发送异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 2. 根据结果提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})  // action提交给mutation的是包含数据的对象, 而不数据本身
    }
  },

  // 保存user的同步action
  saveUser({commit}, user) {
    commit(RECEIVE_USER, {user})
  },

  // 获取当前用户的异步action
  async getUser({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },

  // 请求登出的异步action
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      typeof cb==='function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 更新状态数据之后调用传入的回调函数
      typeof callback==='function' && callback()
    }
  },

  // 更新food的数量的同步action
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 清空购物车数据
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}