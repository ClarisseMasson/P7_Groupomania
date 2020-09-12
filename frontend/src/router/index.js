import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import Comments from '../views/Comments.vue'



Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Connection',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/profile/:accountid',
        name: 'Profile',
        props: true,
        component: Profile
    },
    {
        path: '/post/:postid/comments',
        name: 'Comments',
        props: true,
        component: Comments
    }
]

const router = new VueRouter({
    routes
})

export default router
