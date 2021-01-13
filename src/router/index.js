import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('views/tabbar/home/Home')
const Category = () => import('views/tabbar/category/Category')
const Cart = () => import('views/tabbar/shopcart/Shopcart')
const Profile = () => import('views/tabbar/profile/Profile')


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
 
})

export default router
