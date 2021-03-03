import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('views/tabbar/home/Home')
const Category = () => import('views/tabbar/category/Category')
const Cart = () => import('views/tabbar/shopcart/Shopcart')
const Profile = () => import('views/tabbar/profile/Profile')
const Detail = () => import('views/tabbar/detail/Detail')


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
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
 
})

export default router
