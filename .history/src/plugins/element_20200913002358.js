// 按需导入
import Vue from 'vue'
import { 
     Button,
     Form,
     FormItem,
     Input,
     Message,
     Container,
     Header,
     Aside,
     Main,
     Menu,
     MenuItem,
     MenuItemGroup,
     Submenu,
     Breadcrumb,
     BreadcrumbItem,
     Card,
     Row,
     Col,
     Table,
     TableColumn,
     Switch,
     Tooltip,
     Pagination,
     Dialog,
     MessageBox,
     Tag,
     Tree,
     Select,
     Option,
     Cascader,
     Alert,
     Step,
     Steps,
     Tabs,
     TabPane
    } from 'element-ui'

// 注册为全局组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tabs)
// Message 需要全局挂载，方式不同
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
