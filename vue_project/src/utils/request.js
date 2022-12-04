/***
 * @creater:ACBash
 * @create_time:22-11-28 16:14:35
 * @last_modify:ACBash
 * @modify_time:22-12-4 18:58:25
 * @line_count:56
 **/

import router from '@/router/index';
import axios from 'axios';

/**
 * 创建axios实例
 */
const ENV = process.env.NODE_ENV;
const host = ENV == 'development' ? 'http://127.0.0.1:3000' : 'http://api.acbash.icu';
const service = axios.create({
    baseURL: host,
    timeout: '3000',
})

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
    //不是请求注册/登录的话，要先拦截请求，加入token
    if(!config.url.includes('register') && !config.url.includes('login')){
        config.headers.authorization = localStorage.getItem('token');
    }
    return config;
});

/**
 * 响应拦截
 */
service.interceptors.response.use((res) => {
    const {code, message} = res.data;

    if(code == 0){
        return res.data;
    }else{
        ElMessage({
            message: message,
            type: 'error',
        })
    }

    if(message == '身份认证失败！'){
        router.push('/login');
    }
});

/**
 * 封装请求函数
 */
const request = (options) => {
    //以post方式发起get请求
    if(options.method == 'get'){
        options.params = options.data;
    }
    return service(options);
};

export default request;