import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import Index from '@/page/index.vue'
import goodsList from '@/page/goodsList.vue'
import changeCity from '@/page/changeCity.vue'
import productDetail from '@/page/productDetail.vue'
import login from '@/page/login.vue'
import register from '@/page/register.vue'
import shoppingCarts from '@/page/shoppingCarts.vue'
import pay from '@/page/pay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        }, {
          path: 's/:name',
          name: 'goods',
          component: goodsList,
          children: [
            {
              path: 'meishi/:itemId',
              name: 'productDetail',
              component: productDetail
            }
          ]
        }, {
          path: '/changeCity',
          name: 'changeCity',
          component: changeCity
        }, {
          path: '/shoppingCarts',
          name: 'shoppingCarts',
          component: shoppingCarts
        }, {
          path: '/pay',
          name: 'pay',
          component: pay
        }
      ]
    }, {
      path: '/blank',
      name: 'blankPage',
      component: blankPage,
      children: [{
        name: 'login',
        path: '/login',
        component: login
      }, {
        name: 'register',
        path: '/register',
        component: register
      }]
    }
  ]
})
