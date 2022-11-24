/***
 * @creater:ACBash
 * @create_time:22-11-23 0:17:32
 * @last_modify:ACBash
 * @modify_time:22-11-23 1:12:30
 * @line_count:45
 **/

import { createRouter, createWebHashHistory } from 'vue-router';
//路由配置
const router = createRouter({
    history: createWebHashHistory(),    //选择hash路由
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/home',
            component: () => import('../views/Home'),
            meta: {
                isAuth: true,
            },
        },
        {
            path: '/login',
            component: () => import('../views/Login'),
        },
        {
            path: '/register',
            component: () => import('../views/Register'),
        },
    ],
});
// 路由拦截
router.beforeEach((to, from, next) => {
    //判断是否需要登录权限
    if (to.meta.isAuth) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            ElMessage.error({
                message: '请先登录',
                type: 'error',
            });
            router.push('./login');
        }
    } else {
        next();
    }
});

export default router;