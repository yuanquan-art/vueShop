// 按需导入
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message} from 'element-ui'

// 注册为全局组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// Message 需要全局挂载，方式不同
Vue.prototype.$message = Message
