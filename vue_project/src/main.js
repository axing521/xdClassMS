/***
 * @creater:ACBash
 * @create_time:22-11-22 0:59:51
 * @last_modify:ACBash
 * @modify_time:22-11-24 13:53:44
 * @line_count:13
 **/

import { createApp } from 'vue'
import App from './App.vue'
import './common/base.css'
import router from './router/index'
import * as elementIcons from "@element-plus/icons-vue";

const app = createApp(App);

for(let iconName in elementIcons){
    app.component(iconName, elementIcons[iconName]);
}

app.use(router).mount('#app')