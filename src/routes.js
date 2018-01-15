import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '运营委托',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: Main, name: '电话委托', hidden: false },
            { path: '/table', component: Main, name: '超级用户', hidden: false },
            { path: '/table', component: Main, name: '修改流拍', hidden: false },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '拍品管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '组管理' },
            { path: '/page5', component: Page5, name: '专题管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page6', component: Page6, name: '全部订单' },
            { path: '/page6', component: Page6, name: '售后订单' },
            { path: '/page6', component: Page6, name: '物流管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '全部用户' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资金管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '交易记录' },
            { path: '/page6', component: Page6, name: '审核' },
            { path: '/page6', component: Page6, name: '银行卡管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设置',
        iconCls: 'fa fa-bar-chart',
        leaf: false,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '权限设置' },
            { path: '/page6', component: Page6, name: '积分设置' },
            { path: '/page6', component: Page6, name: '会员设置' },
            { path: '/page6', component: Page6, name: '文档设置' },
            { path: '/page6', component: Page6, name: '标签设置' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;